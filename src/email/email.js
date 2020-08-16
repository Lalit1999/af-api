const sg = require('@sendgrid/mail') ;

sg.setApiKey(process.env.API_KEY) ;

const sendWelcomeMail = (name, email) => {
	sg.send({
		to: email,
		from: 'noreply@apnafurniture.web.app',
		subject: 'Welcome to Apna Furniture: Best, Durable and Modern Furniture',
		html: 
`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title>Welcome E-Mail</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style type="text/css">
  @media screen {
    @font-face {
      font-family: 'Source Sans Pro';
      font-style: normal;
      font-weight: 400;
      src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
    }

    @font-face {
      font-family: 'Source Sans Pro';
      font-style: normal;
      font-weight: 700;
      src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
    }
  }

  body, table, td, a {
    -ms-text-size-adjust: 100%; 
    -webkit-text-size-adjust: 100%; 
  }

  table, td {
    mso-table-rspace: 0pt;
    mso-table-lspace: 0pt;
  }

  div[style*="margin: 16px 0;"] {
    margin: 0 !important;
  }

  body {
    width: 100% !important;
    height: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
  }

  table { 	border-collapse: collapse !important;	}

  a {	color: black;	}

  img {
    height: auto;
    line-height: 100%;
    text-decoration: none;
    border: 0;
    outline: none;
  }
  </style>
</head>
<body style="background-color: #e9ecef;">

  <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
	Hello ${name}! Thank You for choosing Apna Furniture: Best, Durable and Modern Furniture
  </div>

  <table border="0" cellpadding="0" cellspacing="0" width="100%">

    <tr>
      <td align="center" bgcolor="#e9ecef">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <tr>
            <td align="center" valign="top" style="padding: 36px 24px;">
              <a href="https://psyment.com" target="_blank" style="display: inline-block;">
                <img src="https://raw.githubusercontent.com/Lalit1999/psican/master/src/comps/images/Psyment%20logo.jpg" alt="Logo" border="0" width="148" style="display: block; width: 148px; max-width: 148px; min-width: 148px;">
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <tr>
      <td align="center" bgcolor="#e9ecef">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
              <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px; color:black;">Welcome To Apna Furniture, ${name}!</h1>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <tr>
      <td align="center" bgcolor="#e9ecef">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

          <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
              <p style="margin: 0; color:black;">Hello ${name}, Thank You for choosing PSYMENT : Psychology & Mentoring. Let us begin the journey towards self-discovery and inner peace together. We hope you we will be able to satisfy your needs during the time you spend with us. <br/> <br/> Looking Forward to a bright Future! </p>
            </td>
          </tr>

          <tr>
            <td align="left" bgcolor="#ffffff">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                    <table border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">
                          <a href="https://psyment.com" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Visit Psyment</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
              <p style="margin: 0; color:black;">Thanks and Regards,<br> PSYMENT Team</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>

  </table>
</body>
</html>`
	}) ;
}

const sendGoodbyeMail = (name, email) => {
	sg.send({
		to: email,
		from: 'noreply@psyment.com',
		subject: 'Sorry to see you go!',
		text: `Hello ${name}, Sorry to hear that you deleted your account with us.
				We are sorry we could not meet the expectations you had. Please give us your valuable
				feedback so that we can improve.`
	}) ;
}

module.exports = {
	sendWelcomeMail, sendGoodbyeMail
}