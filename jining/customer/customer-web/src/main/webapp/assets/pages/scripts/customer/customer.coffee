customer = {}
((main) ->
  'use strict'
  # 全局属性参数
  configMap =
    path: ''
    dataUrl: '/customer/getCustomers'
    datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json'
    customerGrid: null
    editPageUrl: '/customer/edit.jsp'
    viewPageUrl: '/customer/view.jsp'
    customerForm:null
    editBtn_html: '<a href="javascript:;" class="btn btn-xs btn-default" data-type="edit" data-toggle="tooltip" title="编辑客户信息"><i class="fa fa-edit"></i></a>'
    deleteBtn_html: '<a href="javascript:;" class="btn btn-xs btn-default" data-type="del" data-toggle="tooltip" title="删除客户"><i class="fa fa-times"></i></a>'
    viewBtn_html: '<a href="javascript:;" class="btn btn-xs btn-default" data-type="view" data-toggle="tooltip" title="查看客户信息"><i class="fa fa-search"></i></a>'
    selectTrExt:null
  # 全局Dom
  jqueryMap =
    $myContainer:null
    $blockTarget: null
    $customerDialog: null

  main.init = ->
    setJqueryMap()
    jqueryMap.$myContainer.find('#btnNew_customer').off('click').on 'click',->
      addCustomer()
    jqueryMap.$myContainer.find('#searchFilter').off('keyup').on 'keyup',->
      configMap.customerGrid.search( this.value ).draw()
    initCustomerGrid()
    initCustomerData()
    return

  main.setPath = (path) ->
    configMap.path = path
    return

  setJqueryMap = ->
    jqueryMap.$myContainer=$('#customer_container')
    jqueryMap.$blockTarget = $('body')
    return


  initCustomerData = ->
    App.blockUI
      target: jqueryMap.$blockTarget
      boxed: true
      message: '正在加载数据，请稍候...'
    $.ajax
      url: configMap.path + configMap.dataUrl
      dataType: 'JSON'
      type: 'GET'
      success: (datas) ->
        configMap.customerGrid.clear().draw()
        App.unblockUI jqueryMap.$blockTarget
        if datas.length > 0
          return configMap.customerGrid.rows.add(datas).draw()
        return
      error: ->
        App.unblockUI jqueryMap.$blockTarget
    return

  initCustomerGrid = ->
    configMap.customerGrid = jqueryMap.$myContainer.find('#customer_data').DataTable(
      dom: 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">'
      ordering: false
      destroy: true
      lengthMenu: [
        10
        20
        50
        100
      ]
#      scrollY:  (jqueryMap.$myContainer.parents('.tab-content').height() - 220)+'px'
      autoWidth: false
      columns: [
        { data: 'name' }
        { data: 'code' }
        {
          data: 'createdate'
          render: (data) ->
            moment(data).format 'YYYY-MM-DD HH:mm:ss'

        }
        {
          data: 'state'
          render:(data,type,row)->
            if data
              '<input type="checkbox" checked  data-type="state" data-id="'+row.id+'"/>'
            else
              '<input type="checkbox"  data-type="state" data-id="'+row.id+'"/>'
        }
        {
          data: 'id'
          render: (data) ->
            configMap.editBtn_html + configMap.deleteBtn_html + configMap.viewBtn_html
        }
      ]
      language: url: configMap.path + configMap.datatablesLanguageFile
      drawCallback: ->
        tootipContainer = jqueryMap.$myContainer.find('[data-toggle="tooltip"]')
        editContainer = jqueryMap.$myContainer.find('[data-type="edit"]')
        delContainer = jqueryMap.$myContainer.find('[data-type="del"]')
        viewContainer = jqueryMap.$myContainer.find('[data-type="view"]')
        stateContainer=jqueryMap.$myContainer.find('[data-type="state"]')
        if stateContainer.length>0
          stateContainer.bootstrapSwitch
            size:'mini'
            onColor:'primary'
            offColor:'danger'
            onText:'启用'
            offText:'停用'
            onSwitchChange:changeCustomerState
        if editContainer.length>0
          editContainer.off('click').on 'click', editCustomer
        if viewContainer.length>0
          viewContainer.off('click').on 'click', viewCustomer
        if delContainer.length>0
          delContainer.confirmation
            title:''
            btnOkLabel:'是'
            btnCancelLabel:'否'
            placement:'left'
            container: 'body'
            onConfirm:delCustomer
#        initTableScroll()
        if tootipContainer.length>0
          tootipContainer.tooltip
            container:'body'
        return
    )
    return

  initTableScroll=->
    jqueryMap.$myContainer.find('#div_data_content').find('.dataTables_scrollHeadInner').removeAttr 'style'
    jqueryMap.$myContainer.find('#div_data_content').find('.dataTables_scrollHeadInner').find('table').removeAttr 'style'
    jqueryMap.$myContainer.find('#div_data_content').find(".dataTables_scrollBody").mCustomScrollbar
      scrollButtons:
        enable: true
      axis:"y"
      scrollbarPosition:'outside'
      theme:"minimal-dark"

  changeCustomerState=(event,state)->
    App.blockUI
      target: jqueryMap.$blockTarget
      boxed: true
      message: '正在更新状态...'
    _url=configMap.path+'/customer/setCustomerState'
    _putdata={}
    _putdata.id=$(event.target).data 'id'
    _putdata.state=state
    $.ajax
      headers:
        'Accept': 'application/json'
        'Content-Type': 'application/json'
      type: 'POST'
      dataType: 'json'
      url:_url
      data:JSON.stringify _putdata
      success:(result)->
        App.unblockUI jqueryMap.$blockTarget
        if result.success
          configMap.customerGrid.cell($(event.target).closest('td')).data(state).draw()
        else
          $(event.target).bootstrapSwitch 'toggleState',true
          console.error result.errorMessage
          App.alert
            container: jqueryMap.$blockTarget
            place: 'prepend'
            type: 'danger'
            message: result.errorMessage
            icon: 'fa fa-warning'
      error:(e)->
        App.unblockUI jqueryMap.$blockTarget
        $(event.target).bootstrapSwitch 'toggleState',true
        console.error e.statusText
        App.alert
          container: jqueryMap.$blockTarget
          place: 'prepend'
          type: 'danger'
          message: '更新失败！'
          icon: 'fa fa-warning'

  addCustomer=->
    configMap.selectTrExt=null
    dialogButtons=
      cancel:
        label: '取消'
        className: 'btn-default'
      success:
        label: "保存"
        className: "btn-success"
        callback:addCustomerSave
    $.get configMap.path+configMap.editPageUrl,(html)->
      jqueryMap.$customerDialog=bootbox.dialog
        title:'添加客户'
        message:html
        buttons:dialogButtons
        backdrop:true
      customerValidation jqueryMap.$customerDialog.find('form')
      jqueryMap.$customerDialog.removeAttr 'tabindex'
      setSelect2Ext jqueryMap.$customerDialog
      jqueryMap.$customerDialog.find('#state').bootstrapSwitch
        size:'small'
        onColor:'primary'
        offColor:'danger'
        onText:'启用'
        offText:'停用'
        state:true

  editCustomer=->
    _tr= configMap.customerGrid.row($(this).closest('tr'))
    configMap.selectTrExt=_tr.data().extAtrr
    dialogButtons=
      cancel:
        label: '取消'
        className: 'btn-default'
      success:
        label: "保存"
        className: "btn-success"
        callback:->
          editCustomerSave _tr
    $.get configMap.path+configMap.editPageUrl,(html)->
      jqueryMap.$customerDialog=bootbox.dialog
        title:'编辑客户'
        message:html
        buttons:dialogButtons
      jqueryMap.$customerDialog.find('#name').val _tr.data().name
      jqueryMap.$customerDialog.find('#code').val _tr.data().code
      jqueryMap.$customerDialog.find('#state').bootstrapSwitch
        size:'small'
        onColor:'primary'
        offColor:'danger'
        onText:'启用'
        offText:'停用'
        state:_tr.data().state
      customerValidation jqueryMap.$customerDialog.find('form')
      setSelect2Ext jqueryMap.$customerDialog

  viewCustomer=->
    _tr= configMap.customerGrid.row($(this).closest('tr'))
    configMap.selectTrExt=_tr.data().extAtrr
    dialogButtons=
      cancel:
        label: '关闭'
        className: 'btn-default'
    $.get configMap.path+configMap.viewPageUrl,(html)->
      jqueryMap.$customerDialog=bootbox.dialog
        title:'客户信息'
        message:html
        buttons:dialogButtons
      jqueryMap.$customerDialog.find('#name').html _tr.data().name
      jqueryMap.$customerDialog.find('#code').html _tr.data().code
      jqueryMap.$customerDialog.find('#createdate').html moment(_tr.data().createdate).format 'YYYY-MM-DD HH:mm:ss'
      if configMap.selectTrExt isnt null and configMap.selectTrExt isnt ''
        _$fromgroup=jqueryMap.$customerDialog.find('.form-group').last()
        setExtView _$fromgroup,null,'view',$.parseJSON(configMap.selectTrExt),$.parseJSON(configMap.selectTrExt).title
      return

  delCustomer=(event, element) ->
    App.blockUI
      target: jqueryMap.$blockTarget
      boxed: true
      message: '正在删除数据...'
    _tr= configMap.customerGrid.row($(element).closest('tr'))
    _url=configMap.path + '/customer/deleteCustmer'
    $.ajax
      type: 'DELETE'
      dataType: 'json'
      url:_url
      data:_tr.data().id
      success:(result)->
        App.unblockUI jqueryMap.$blockTarget
        if result.success
          _tr.remove().draw()
        else
          console.error result.errorMessage
          App.alert
            container: jqueryMap.$blockTarget
            place: 'prepend'
            type: 'danger'
            message: result.errorMessage
            icon: 'fa fa-warning'
      error:(e)->
        App.unblockUI jqueryMap.$blockTarget
        console.error e.statusText
        App.alert
          container: jqueryMap.$blockTarget
          place: 'prepend'
          type: 'danger'
          message: '删除失败！'
          icon: 'fa fa-warning'

  addCustomerSave=->
    if not jqueryMap.$customerDialog.find('form').valid()
      return false
    App.blockUI
      target: jqueryMap.$customerDialog
      boxed: true
      message: '正在保存数据...'
    $extinputs=jqueryMap.$customerDialog.find '[data-type="ext"]'
    _extData={}
    _.forEach $extinputs,(value)->
      _extData[$(value).data 'colname']=$(value).val()
    if _.size(_extData)>0
      _extData.title=jqueryMap.$customerDialog.find("#select2_extAtrr").val()
    _customer=
      name:jqueryMap.$customerDialog.find('#name').val()
      code:jqueryMap.$customerDialog.find('#code').val()
      createdate:moment()
      state:jqueryMap.$customerDialog.find("#state").is(':checked')
      extAtrr:JSON.stringify _extData
    _url = configMap.path + '/customer/insertCustomer'
    $.ajax
      headers:
        'Accept': 'application/json'
        'Content-Type': 'application/json'
      type: 'POST'
      dataType: 'json'
      url:_url
      data:JSON.stringify _customer
      success:(result)->
        App.unblockUI jqueryMap.$customerDialog
        if result.success
          configMap.customerGrid.row.add(result.data).draw()
          jqueryMap.$customerDialog.modal 'hide'
        else
          console.error result.errorMessage
          App.alert
            container: jqueryMap.$customerDialog.closest '.modal-body'
            place: 'prepend'
            type: 'danger'
            message: result.errorMessage
            icon: 'fa fa-warning'
      error:(e)->
        App.unblockUI jqueryMap.$customerDialog
        console.error e.statusText
        App.alert
          container: jqueryMap.$customerDialog.closest '.modal-body'
          place: 'prepend'
          type: 'danger'
          message: '保存失败！'
          icon: 'fa fa-warning'
    return false

  editCustomerSave=(tr)->
    if not jqueryMap.$customerDialog.find('form').valid()
      return false
    App.blockUI
      target: jqueryMap.$customerDialog
      boxed: true
      message: '正在保存数据...'
    _customer=tr.data()
    $extinputs=jqueryMap.$customerDialog.find '[data-type="ext"]'
    _extData={}
    _.forEach $extinputs,(value)->
      _extData[$(value).data 'colname']=$(value).val()
    if _.size(_extData)>0
      _extData.title=jqueryMap.$customerDialog.find("#select2_extAtrr").val()
    _customer.name=jqueryMap.$customerDialog.find('#name').val()
    _customer.code=jqueryMap.$customerDialog.find('#code').val()
    _customer.extAtrr=JSON.stringify _extData
    _customer.state=jqueryMap.$customerDialog.find("#state").is(':checked')
    _url = configMap.path + '/customer/updateCustmer'
    $.ajax
      headers:
        'Accept': 'application/json'
        'Content-Type': 'application/json'
      type: 'PUT'
      dataType: 'json'
      url:_url
      data:JSON.stringify _customer
      success:(result)->
        App.unblockUI jqueryMap.$customerDialog
        if result.success
          tr.data(result.data).draw()
          jqueryMap.$customerDialog.modal 'hide'
        else
          console.error result.errorMessage
          App.alert
            container: jqueryMap.$customerDialog.closest '.modal-body'
            place: 'prepend'
            type: 'danger'
            message: result.errorMessage
            icon: 'fa fa-warning'
      error:(e)->
        App.unblockUI jqueryMap.$customerDialog
        console.error e.statusText
        App.alert
          container: jqueryMap.$customerDialog.closest '.modal-body'
          place: 'prepend'
          type: 'danger'
          message: '保存失败！'
          icon: 'fa fa-warning'
    return false

  customerValidation =($html) ->
    $html.validate
      errorElement: 'span'
      errorClass: 'help-block help-block-error'
      focusInvalid: false
      ignore: ''
      rules:
        name:
          minlength: 2
          required: true
        code:
          minlength: 2
          required: true
      errorPlacement: (error, element) ->
      # 为每种input设置错误输出位置
        if element.parent('.input-group').size() > 0
          error.insertAfter element.parent('.input-group')
        else if element.attr('data-error-container')
          error.appendTo element.attr('data-error-container')
        else
          error.insertAfter element
        return
      highlight: (element) ->
      # 高亮显示控件form-group和has-error都是样式类
        $(element).closest('.form-group').addClass 'has-error'
      unhighlight: (element) ->
      # 取消高亮显示
        $(element).closest('.form-group').removeClass 'has-error'
      success: (label) ->
        label.closest('.form-group').removeClass 'has-error'
    return

  setSelect2Ext=($from)->
    _url=configMap.path+'/customer/getExtAtrrList'
    $.ajax
      type: 'GET'
      dataType: 'json'
      url:_url
      success: (data) ->
        _select2Data=$.map data,(obj)->
          obj.id=obj.tempName
          obj.text=obj.text or obj.tempDesc
          return obj
        select2ExtAttr=$from.find('#select2_extAtrr').select2
          width:'100%'
          placeholder: "请选择模版"
          allowClear: true
          minimumResultsForSearch: Infinity
          data:_select2Data
        select2ExtAttr.on 'select2:select',(e)->
          $from.find('.extattr').remove()
          _$fromgroup=$(e.target).closest('div .form-group')
          setExtView _$fromgroup,e.params.data.tempContent,'edit'
          return
        if configMap.selectTrExt isnt null and configMap.selectTrExt isnt ''
          $from.find('.extattr').remove()
          _$fromgroup=jqueryMap.$customerDialog.find('#select2_extAtrr').closest('div .form-group')
          select2ExtAttr.val($.parseJSON(configMap.selectTrExt).title).trigger 'change'
          setExtView _$fromgroup,null,'edit',$.parseJSON(configMap.selectTrExt),$.parseJSON(configMap.selectTrExt).title

  setExtView=($fromgroup,tempContent,type,extContent,title)->
    _htmlExt=''
    if extContent is undefined
      _.forEach $.parseJSON(tempContent),(value)->
        _htmlExt+="""
                  <div class="form-group extattr"><label for="ext_#{value.name}" class="col-sm-3 control-label">#{value.desc}</label><div class="col-sm-9"><input type="text" class="form-control" data-type="ext" data-colname="#{value.name}" id="ext_#{value.name}" name="extname_#{value.name}"></div></div>
                    """
      $fromgroup.after _htmlExt
    else
      _url=configMap.path+'/customer/getExtAtrr/'+title
      $.ajax
        type: 'GET'
        dataType: 'json'
        url:_url
        success: (data) ->
          if type is 'edit'
            _.forEach $.parseJSON(data.tempContent),(value)->
              _val=extContent[value.name]
              _htmlExt+="""
                        <div class="form-group extattr"><label for="ext_#{value.name}" class="col-sm-3 control-label">#{value.desc}</label><div class="col-sm-9"><input type="text" class="form-control" data-type="ext" data-colname="#{value.name}" id="ext_#{value.name}" name="extname_#{value.name}" value="#{_val}"></div></div>
                          """
          if type is 'view'
            _.forEach $.parseJSON(data.tempContent),(value)->
              _val=extContent[value.name]
              _htmlExt+="""
                        <div class="form-group extattr"><label for="ext_#{value.name}" class="col-sm-3 control-label">#{value.desc}</label><div class="col-sm-9"><p class="form-control-static">#{_val}</p></div></div>
                    """
          $fromgroup.after _htmlExt

  return
) customer