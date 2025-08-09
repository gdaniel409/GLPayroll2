# GLPayroll

        This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.5.

        revision: 2.0.0
        
        GLPayroll UI can be downloaded from "https://github.com/gdaniel409/GLPayroll2">. 
        The API can be downloaded from https://github.com/gdaniel409/SubsidiaryAPI.
        To see a demo version go to https://www.audiosl.com/glpayroll.

        Contact  Gordon: gordondaniel409@gmail.com.
        
        This is a project demonstrating how a payroll application might
        work developed using Angular 19 and Angular material. 
        The backend is an .NET MS MVC API application
        that connects to a MySql database.
             
        GLPayroll will currently handle about 25-30 employees. With a few modifications it could handle
        hundreds of thousands, depending on the functional specification.  For the application to be put into production a 
        few modifications would need to made requiring more coding.  For example you most likely would not
        want to return all the activity logs at one time.  Probably just a small subset.
      
        Interestingly, the production version is enabled with SignalR which enables real time updates.  If you have 
        multiple clients running and one client updates the database the other clients are notified to update their views.  
  
        To log an actiity for an employee, do the following:
        
            1. Click-on 'Employees.
            2. Click-on 'Log Activity' to select the employee.
            3. On the 'Select Activity' view select the activity.
            4. Enter the 'Units of Work' and DateTimes.
            5. Click-on 'Save.'

        Accounting:

        GLPayroll is a subsidiary ledger which means the data details are stored in the GLPayroll database.  For a production version, an ETL process should run at the close of every accounting period and create summay data which is entered into a general ledger's payroll journal such as GLAccounting.  

        Another ETL process should run at the end of each pay period to distribute payroll payments through ACH checks.  It should be rare that it is necessary to manually make payroll payments though it is possible to do so.

        To install:

        npm install

        npm install @microsoft/signalr

  # GLPayroll2
# GLPayroll2
