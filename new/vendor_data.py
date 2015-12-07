__author__='rk'

from pymongo import MongoClient
from datetime import datetime
import re


client = MongoClient()
today=datetime.today()


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
            l_end_date = license["lenddate"]
            license_expiry=l_end_date-today
            license_expiry_days = license_expiry.days
#            print license_expiry_days
            license_expiry_str = str(license_expiry)


            #print license_expiry_days



# Array of all expiring licenses
# Get Top 10 expiring licenses.
licenses_to_expire.sort()


# Get Top 10 licenses

print licenses_to_expire[:10]




#email_msg = MIMEText("hi hello how are you ?")


#print no_of_vendors
