# sendgrid-webhook-then-send-inline-gmail

This little app is attempting to demonstrate how to send an email, then a robot (SendGrid) catches the email, and sends a reply back. That reply should be inline.

## Usage

Send an email to hi@inline.webhook.email

It will reply back to your same email. 

You will see that the reply is inlined in a gmail conversation - as desired.

## Setup

```
cp .env.example .env
```

Edit the contents of that with your SendGrid credentials.

Go to <https://sendgrid.com/developer/reply>

Set hostname to `inline.webhook.email` and set url to `https://inline.ngrok.com/inbound`.

Start up ngrok: `ngrok -subdomain inline 3000`

Start up the app: `node app.js`


