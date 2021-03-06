# GHST
- Code language: JavaScript
- Framework: React 17.0.1
- UI Library: Material-UI 4.11.3
- Icons: Material-UI Icons 4.11.2

## Install
    Node >= 8.10 with npm >= 5.6
    Google Cloud SDK https://cloud.google.com/sdk/ (just download it)

## Run app locally
    npm i
    npm start

## Test
    npm test

## Install/Reinstall cloud configs
    './google-cloud-sdk/bin/gcloud init' inside of downloaded sdk folder (not from root of project)
    'Pick configuration to use:
      [1] Re-initialize this configuration [default] with new settings'
    'Select your e-mail from the list'
    'Select pre-created project from Google Cloud (etc. learned-battery-299610)'

## Google cloud deploy running
    'gcloud auth login' // to log in with google account
    'npm run build'
    'gcloud app deploy'

## Links
    https://morioh.com/p/656381bcb059