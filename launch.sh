#cd to directory of Flask app
cd src/app/

#For powershell
$env:FLASK_APP = "app:create_app('default')"

#For Linux system
#export FLASK_APP="app:create_app('default')"

flask db init 
flask db migrate
flask db upgrade 

flask run
