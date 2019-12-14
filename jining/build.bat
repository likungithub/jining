@echo off
cd /d %~dp0
call mvn clean install
del /a /f /s /q "%JBOSS_HOME%\standalone\deployments\*.war"
for /f "delims=" %%k in ('dir/s /b %~dp0\*-web*') do (
	copy %%k\src\main\resources\properties\global.properties "%JBOSS_HOME%\modules\system\layers\base\org\jboss\as\ejb3\main\timers" /y
	copy %%k\src\main\resources\properties\custom.properties "%JBOSS_HOME%\modules\system\layers\base\org\jboss\as\ejb3\main\timers" /y
    for /f "tokens=*" %%i in ('dir/s/b %%k\*.war') do (
        copy %%i "%JBOSS_HOME%\standalone\deployments" /y
    )
)

echo 编译发布完成......
pause
