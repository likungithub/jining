<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/securityassets/css/style.css"
	type="text/css" />
<style type="text/css">
       .progress-title{
           font-size: 16px;
           font-weight: 700;
           color: #333;
           margin: 0 0 20px;
       }
       .progress{
           height: 10px;
           background: #333;
           border-radius: 0;
           box-shadow: none;
           margin-bottom: 30px;
           overflow: visible;
           z-index: 10086;
       }
       .progress .progress-bar{
           position: relative;
           -webkit-animation: animate-positive 2s;
           animation: animate-positive 2s;
       }
       .progress .progress-bar:after{
           content: "";
           display: inline-block;
           width: 9px;
           background: #fff;
           position: absolute;
           top: -10px;
           bottom: -10px;
           right: -1px;
           z-index: 1;
           transform: rotate(35deg);
       }
       .progress .progress-value{
           display: block;
           font-size: 16px;
           font-weight: 600;
           color: #333;
           position: absolute;
           top: -30px;
           right: -25px;
       }
       @-webkit-keyframes animate-positive{
           0%{ width: 0; }
       }
       @keyframes animate-positive {
           0%{ width: 0; }
       }
      .bootbox-body{
       	width:300px !important;
       }
</style>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/securityassets/scripts/cropbox.js"></script>
<div class="container" id="uploaduserimg">
	<div class="imageBox">
		<div class="thumbBox"></div>
		<div class="spinner" style="display: none">Loading...</div>
	</div>
	<div class="action">
		<!-- <input type="file" id="file" style=" width: 200px">-->
		<div class="new-contentarea tc">
			<a href="javascript:void(0)" class="upload-img">
				<label for="upload-file">上传图像</label>
			</a>
			<input type="file" class="" name="upload-file" id="upload-file"/>
		</div>
		<input type="button" id="btnCrop" class="Btnsty_peyton" value="裁切">
		<input type="button" id="btnZoomIn" class="Btnsty_peyton" value="+">
		<input type="button" id="btnZoomOut" class="Btnsty_peyton" value="-">
	</div>
	<div class="cropped"></div>
</div>
<script
	src="<%=request.getContextPath()%>/securityassets/scripts/returnimg.js"
	type="text/javascript"></script>
<script type="text/javascript">
	var options = {
		thumbBox : '.thumbBox',
		spinner : '.spinner',
		imgSrc : ''
	}
	var cropper = $('.imageBox').cropbox(options);
	$('#upload-file').on('change', function() {
		var reader = new FileReader();
		reader.onload = function(e) {
			options.imgSrc = e.target.result;
			cropper = $('.imageBox').cropbox(options);
		}
		reader.readAsDataURL(this.files[0]);
		/* this.files = []; */
	})
	$('#btnCrop').on('click',function() {
		var img = cropper.getDataURL();
		$('.cropped').html('');
		$('.cropped').append('<img src="'+img+'" align="absmiddle" style="width:64px;margin-top:4px;border-radius:64px;box-shadow:0px 0px 12px #7E7E7E;" ><p>64px*64px</p>');
		$('.cropped').append('<img src="'+img+'" align="absmiddle" style="width:128px;margin-top:4px;border-radius:128px;box-shadow:0px 0px 12px #7E7E7E;"><p>128px*128px</p>');
		$('.cropped').append('<img src="'+img+'" align="absmiddle" style="width:180px;margin-top:4px;border-radius:180px;box-shadow:0px 0px 12px #7E7E7E;"><p>180px*180px</p>');
		$('.cropped').append('<input type="hidden" value="'+img+'" id="imgid">');
	})
	$('#btnZoomIn').on('click', function() {
		cropper.zoomIn();
	})
	$('#btnZoomOut').on('click', function() {
		cropper.zoomOut();
	})
</script>