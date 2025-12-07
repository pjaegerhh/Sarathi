we are now working on the profile page. 
it will be a complete redesign.
the top menu will of course be visible.

the design is similar to our homepage. the width of the canvas is 1280px and needs to be fully responsible. if screensize is > 1280px keep canvas 1280px and add left and right boarders same as homepage. the page will scroll endless.

the first section is a full width cover picture which can later be uploaded by user, the profile picture (round) as well. if the user has not uploaded personal pictures for that we will use a gradient. the size of the cover picture section is 1280x420 and default it is set to our typical green gradient.

we have after the pictures splitted row design. 1st row has "About" and "My Story" both should be editable by user when clicking on "edit profile" button. and need to be saved in user_table.
on about we have profession, workplace and place of residence.
my story is just a long textfield. when editing some easy HTML editor should be used for editing. it should be displayed with html and saved as well.
than we have different sized boxes - on left side we have the most recents picture & video uploads from posts of the user and below we have the connections of the user to other users. 

below the uploads section we have the friend connections to other users. this system will be implemented later.

on the right side the user is able to create a new post (will be implemented later). below the user will see his latest activities.

for activities we also need a new table where we save activity type(Post, Comment, Like, Group Join, Comment from others to a post of user, like from others to a post and more activities to come), activity content, created_at, user_id (which is the current user)

all the pictures and videos will be saved in supabase as blob objects in a storage bucket (you need to create it) and the reference to that blob object will be stored in corresponding table (user, post, connection, ...).

When clicking on "Read More" button in My Story a modal dialog will be opened. design will come later.