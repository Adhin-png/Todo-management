Todo Application 

A simple and efficient To-Do application built with modern web technologies to help users manage their tasks effectively. This project focuses on creating a seamless user experience and 
robust backend functionality.In backend of this project i used Django Rest Framework and Postgrsql as backend to store and fetch the data.It conisit of models,serializers,and views url,
I have defined the model named Task with field title,description,due date,status choices consist of pending,Inprogress and Completed defined  pending as default.


INSTALLATION

1) install virtual environment
    --> pip install virtualenv
2)create a virtual environment
    --> virtualenv env_name env/venv/todoenv
    --> py -m virtualenv env_name
3)activate virtual environment
    --> env_name\Scripts\activate
4)install django
    --> pip install django
    --> py -m django --version
5)create a project
    --> django-admin startproject project_name
6)change directory
    --> cd project_name
7) create app
    --> py manage.py startapp app_name
8) run
    --> py manage.py runserver
for changing the default dbsqlite to PostgrSQL done the following steps:
1.pip install psycopg2
2.Set up a PostgreSQL database  in settings.py
3.python manage.py makemigrations
  python manage.py migrate
4.pip install django-rest-framework
5.python manage.py runserver

In this project React as the frontend framework, integrated with a Django backend to handle task-related data. The application allows users to manage their 
tasks effectively by providing features for viewing, adding, editing, and tracking to-dos with different statuses. The system includes the following core components:

Home Page: Displays a list of tasks and includes options for filtering based on the task status (e.g., All, Pending, In Progress, Completed).
Add Todo Page: A form where users can add a new to-do, including selecting the task's due date and status.
Edit Todo Page: Allows users to update existing to-do details, including title, description, status, and due date.
Todo Details Page: Displays full details of a specific to-do, with options for viewing the task and deleting it.
Calendar View: a calender view on navbar redirects to a   visual representation of tasks in a calendar format, helping users to track their to-dos by due date.

INSTALLATION:

1. install react-npm install create-react-app
2. creae app-npx create-react-app app projectname
3.cd project 
4.npm start
5.npm install react-bootstrap react-router-dom axios
another method -npm i vite,npm i vite@latest
install -npm create vite@latest
{y-projectname-react-javascript}
cd projectname
npm install
npm run dev
npm i react-bootstrap react-router-dom axios bootstrap
 for calendar integration i used npm install react-calendar






