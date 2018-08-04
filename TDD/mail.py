

class SendMail(object):
    def __init__(self):
        self.mail = ["cat@gmail.com", "cliff@gmail.com", "arnell@gmail.com"]

    def filter_emails(self, black_list):
        """return emails that are not in the email black_list

        Args:
            black_list: a list of emails to be excluded from
            the final email list

        returns:
            list of emails that are not in the black_list
        """

        filtered_mail = []
        for email in self.mail:
            for bad_email in black_list:
                if bad_email not in email:
                    filtered_mail.append(email)
        return filtered_mail
