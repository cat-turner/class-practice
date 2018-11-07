All Devops Jedis DO These Things:
disciplined learning
continuous experimentation
===


https://www.devopsdays.org/events/2018-boston/program/

# Talk 1 - Anatomy of a AWS Cryptojack

Anton Gutov


Happens due to leaked AWS credentials
Account take overs

Codespaces - 2014

Ransom

Incident

Sign
Cloudtrail - audit data

Cloudhealth

timeline

Access key 1 got rotated - they did this to lock you out and anyone else
User went from read only to admin (with console acess)
Instances, VPCs, started to get created

AWS Credentials Report
generate-credentials-repot

they had pre-baked amis

limited to 200 machines

Prevention and Detection

Secure AWS account
physial MFA
Disable API
Enable and force MFA for all operations


cli-wrapper for MFA: aws-vault
No direct permissions to users, use IAM AssumerRole

Applications and Services Account

Threatstack - 
Scan you code for AWS keys before they do:
Gitguardian, keynuker, gitsecrets

use cloudtrail to audit you acounts
Create billing allerts to monitor your estimate AWS charges

Real-time monitoring
threatstack, sumologic, splunk

### 3 takeways
- enforce mfa on user and root accounts
- use IAM roles, ban key/secret keys
- enable cloudtrail.config monitoring and cost alerting

keylogger, screenshots - can get access if you have it set up on your machine.

s3 bucket can be stand alone account, seperate from anything

key/secret key can be saved in env vars

Secrets

secretless.io

----

Performance Testing

Selenium Grid

Read site reliability engineering


Performance Imperative
 get your users what they are looking for

 performance: scalability, reliability

 slow is the same as outage for them

WHAT IS PERFORMANCE FOR DIFFERENT GROUPS
user: slow == broken

 Developer Experience : easy to push faulty code, fast feedback, re-work, emergent behaviors hard to see

 Operations Experience : infra changes all the time
, risk in new deploy models, scalability isn't free

Ruxit - realtime visitbility under synthetic load
feedback should be quick, not monolithic

performance + security testing - early and often

this is to increase the feeback loop

measurements should be part of the decsion making process

load testing
https://hub.docker.com/r/neotys/neoload-loadgenerator/

have a build step in jenkins


=====

Quick and Dirty Dev Sec Ops

Privilaged systems
take privilaged user access seriously
cycling systems

Constantly be cyctling things out

Immutable - you completely replace through automation

put infra deployments in jenkins pipeline. have security tests.

How immutable works - autoscaling group

cycle out old servers
path and replcase

code scan
flag security sensitive code adn require manual approval
security tests

security tests can be a nightly build

Incident Response

- you get hack
- you bring people
- they figure out what happened

now
- automated process for incidents
- take it off network
- self healing infra
- EX someone changes the security group, it triggers cloud watch, lambda runs to reverse the change
*** watch security group changes


secure architecture design is important
shared security chart
security can easily embed and automate toolchains

Build a secure deploy pipeline

code commit is aws hosted git
remove obvious attack points from the servers



jenkins
1. change your initial password
2. change your initial admin password in jenkins

look at credentials embedded in the files
make sure port 22 is closed
the gauntlt attack file

when you are in production. make sure you ensure who has access to these credentials
jenkins server itself should be luckout
audittrail plugin

anyone with access to config.xml has access to your secutiy!!!
audit trail history.

guardrails

HW
study what the weak security points in jenkins

secure ops princeple
- software defined security
- event-triggered rules
- security development team
- 40 ppl
- 4 people build security scripts

Baseline Security Functions
- core monitoring and logging
- IAM and permissions
- security architecture
- nobody should have root access to security root account

don't tell me its broken. tell me you fixed it.
dont bring me problems. bring me solutions.

Require MFA for API access for any user that needs MFA for console access.

**educate, don't blame**
all in the nuances

lambdas
cons
no SSL
5 min limits
Not changing things unit you are confident wih what you are changing
monitor everything
AI that looks for anamolies

