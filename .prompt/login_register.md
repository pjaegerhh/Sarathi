We now want to setup login workflow with supabase
The supabase project ID is axytclwosgvuanglpvii
The supabase anon key I will add to .env file. Make sure to add supabase anon key also to our github actions workflow and add docs on how to add the keys to workflow and to testing and production environment on Azure. I think the keys need to be added in Github
I want you to remember all changes on our supabase database schema later to also add to our database_schema.sql file in .\supabase
I do not want to use kv_store in supabase remember this as well
Remember that all schema edits have to take place in supabase GUI. SQL files will be executed manually.
We have an admin and a superadmin which have all rights to all tables and fields in our app. both users are already created. 
We have to create a table called sarathi_user with the following fields:
- UUID
- Name
- FirstName
- email
- telephone
- user_type (can be admin, superadmin, moderator, amputee, caregiver, doctor, practiconeer, volunteer)
- prosthesis_type (can be above_knee, below_knee, empty, null)
- length_usage (can be less_than_6_month, more_than_1_year, more_than_5_years, empty, null)
- main challenge (can be one or more of the following: fit_comfort, mobility, community, cost_access, training, emotional, empty, null)
- activities (can be one or more of the following: rehabilitation, social_life, emotions, pain_relief, work, independence, education, confidence, training, sports, guidance, community, maintenance, empty, null)

The design for the login procedure can be found using get_design_context
Background Image is .\src\assets\images\Login_desktop.png.
Logo is .\src\assets\svg\sarathi_login.svg
Password Vector is .\src\assets\svg\lock_pwd.svg
Google logo is .\src\assets\svg\google.svg
Apple logo is .\src\assets\svg\apple.svg
Facebook logo is .\src\assets\svg\facebook.svg

Greyout Google, Apple and Facebook button.
add a field for entering email address below telephone# and above password in same layout. Greyout telephone.
Make this responsible for desktop and mobile. Desktop standard size is 1280 and can be seemlessly scaled down to mobile sizes. if screensize is > 1280 add left and right borders in our maincolor. at an later stage we might add a specific mobile login screen. for now just use for mobile the responsive desktop version.

Save the login state through out the app. if no user is logged in, show login screen when any of the topmenu or mobilemenu buttons are pressed. show login when login button on mainscreen is pressed. make the login state permanent for max 30 days with a cookie.
