# PALMMIND DEMO CRUD PROJECT - AS REQUESTED
## Assumptions made during the development
- I assumed that the software to be built should allow users to be registered, login and change password.
- One of the users will be admin.
- Admin will be able to manage registered users. Other normal user will be able to login and view their logged in page.
- Admin can view list of users.
- Admin can delete users. (Admin cannot delete himself)
- Users can also change their password if they forget their password.
- Password reset email will be sent to the user email.
- I used nodemailer to send email through gmail account. (Other paid services could also be used)

## Technologies used
- I used express to implement this app
- I used jquery to add interractivity to pages. (For example deleting user through AJAX request)
- AJAX was performed by jquery instead of axios because jquery can also perform AJAX request. It would be redundant to used two seperate technology for same task.
- I used bootstrap for styling.
- I used pug as templating engine.
- MongoDB as database

## Screenshots of app
![Homepage](https://github.com/mrbpurnachandra/palmmind/assets/150110046/7c32459c-cad5-40b6-b4bd-50855a09c9cb)
![Registration Page](https://github.com/mrbpurnachandra/palmmind/assets/150110046/042218f7-416f-490a-8999-17b12b6cb637)
![Login Page](https://github.com/mrbpurnachandra/palmmind/assets/150110046/31e2fbe3-cfc2-42e1-95f5-1beb603122aa)
![Normal User Dashboard](https://github.com/mrbpurnachandra/palmmind/assets/150110046/419bd87d-570c-452e-90f7-73118259f0fc)
![Admin Dashboard Page](https://github.com/mrbpurnachandra/palmmind/assets/150110046/9464824d-ae32-4aa5-a09e-4b2c8e5cfa01)
![Admin Cannot be Deleted](https://github.com/mrbpurnachandra/palmmind/assets/150110046/8451518b-89c9-4741-963a-fe4b02fa91e4)
![Admin Viewing User Information](https://github.com/mrbpurnachandra/palmmind/assets/150110046/d64c3bd7-76a4-4089-a46b-bf8e6bd6602f)
![Forgot Password Page](https://github.com/mrbpurnachandra/palmmind/assets/150110046/c4a58018-bb5d-45cf-bcad-dc5bda58bc93)
![Password Reset Email Sent](https://github.com/mrbpurnachandra/palmmind/assets/150110046/7e0ecccf-02ed-4d37-9e9a-cbc39eb1d9fa)
![Change Password](https://github.com/mrbpurnachandra/palmmind/assets/150110046/2bc85ce1-2d71-4842-bf2c-3dea51a70835)
