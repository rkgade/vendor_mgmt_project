__author__='rk'

from pymongo import MongoClient
from datetime import datetime
from datetime import date
from dateutil.relativedelta import relativedelta
import time
import re
import smtplib
from email.mime.text import MIMEText
date_format="%y-%m-%d"
client = MongoClient()
today=datetime.strftime(datetime.today(),date_format)
expiry_deadline_date=datetime.strftime((today+relativedelta(months=3)),date_format)

print expiry_deadline_date
no_of_vendors= []
licenses_to_expire=[]

db = client.vendor
vendors = db.vendor.find()
# Product Class
class Product:
    def __init__(self, product_name, license_no, days_to_expire):
        self.product_name = product_name
        self.license_no = license_no
        self.days_to_expire=days_to_expire


for vendor in vendors:
    vendor_name= vendor["vname"]
    no_of_vendors.append(vendor_name)

#    print vendor

#    print vendor_name

    for product in vendor["products"]:
        product_name = product["pname"]
#        print product_name
#        print product
        for license  in  product["plicense"] : # licenseno lcomments lstatus lstartdate lenddate
#            print license
            #print license["licenseno"]                  # Printing License Details for Each Product
            #print license["lstartdate"].strftime("%d/%m/%y")
            l_end_date = datetime.strftime(license["lenddate"],date_format)
            license_expiry=l_end_date-today
            license_expiry_days = license_expiry.days
#            print license_expiry_days
            license_expiry_str = str(license_expiry)

            s = re.search('days',license_expiry_str)
            #print license_expiry_days
            if license_expiry_days > 0:
                licenses_to_expire.append(license_expiry_days)


            if s:
                if license_expiry_days < 90 :
                    print "In 90 Days: "
#                    print "Vendor : ", vendor_name, "Product :",product_name

            else:

                print "In 24 Hours :"
#               print "Vendor : ", vendor_name ,"Product : ",product_name


# Array of all expiring licenses
# Get Top 10 expiring licenses.
licenses_to_expire.sort()


# Get Top 10 licenses

print licenses_to_expire[:10]




#email_msg = MIMEText("hi hello how are you ?")


#print no_of_vendors
