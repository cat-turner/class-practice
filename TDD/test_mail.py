from mail import SendMail
import unittest


class TestSendMail(unittest.TestCase):

    def setUp(self):
        self.black_list = ["cliff@gmail.com"]

    def test_filter_emails(self):
        mail = SendMail()
        output = mail.filter_emails(self.black_list)
        self.assertNotIn("cliff@gmail.com", output)

    def test_not_filter_emails(self):
        mail = SendMail()
        output = mail.filter_emails(self.black_list)
        self.assertIn("cat@gmail.com", output)
        self.assertIn("arnell@gmail.com", output)

if __name__ == '__main__':
    unittest.main()