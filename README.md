# Date_Smart
"Welcome to the 'Date_Smart' Git Repo – crafting the backend for an innovative Dating App. We're developing matchmaking algorithms, user profiles, messaging systems, and more, all to foster meaningful connections. While the backend is a work in progress, we're excited about its potential.

# Setup Project
Follow these steps to set up the project environment and get it running:

# 1. Create Environment Files
1. Create an env folder in the root directory of the project.
2. Inside the env folder, create two environment files: .env.dev and .env.stage.

# 2. Add Environment Variables
In both .env.dev and .env.stage files, set the following environment variables:

PORT=1000
secret=JWT_Secret_Here
URI=MongoDB_Connection_String_Here
twilioSid=Twilio_SID_Here
twilioToken=Twilio_Token_Here

Replace JWT_Secret_Here, MongoDB_Connection_String_Here, Twilio_SID_Here, and Twilio_Token_Here with your actual values.

# 3. PowerShell Environment Selection
Open your PowerShell terminal.
Choose the environment you want to use:

For development environment:
$env:NODE_ENV="dev"

For staging environment:
$env:NODE_ENV="stage"

# 4. Start the Application
After selecting the environment, run the following command to start the application:
# npm start















