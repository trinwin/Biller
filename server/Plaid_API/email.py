from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText 
import smtplib 

server = smtplib.SMTP('smtp.gmail.com', 587)
server.ehlo()
server.starttls()
server.ehlo()
server.login('no.reply.biller@gmail.com', 'Hello123.')

def send_email(account, bill):
    try:
        fromaddr = "no.reply.biller@gmail.com"
        toaddr = account.user.email
        message = MIMEMultipart()
        message['FROM'] = fromaddr
        message['TO'] = toaddr 
        message['subject'] = "Bill Due " + str(bill.due_date) + " Notice"
        body = "Your bill for " + account.name + " for " + str(bill.amount) + " is due on " + str(bill.due_date)
        message.attach(MIMEText(body, 'plain'))
        text = message.as_string()
        server.sendmail(fromaddr, toaddr, text)
        bill.notified = True
        bill.save()
    except Exception as e:
        print(e.body)
    return bill.notified