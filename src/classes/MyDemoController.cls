//Apex Controller for the Employee101 demo application. Started on : 29 May 2018 Created By:Niyat Vyas 


public with sharing class MyDemoController {

//User name greetings
@AuraEnabled
    public static String getUserName() {
    return userInfo.getName();
     }

//Get User Info for Personal Information    
@AuraEnabled 
    public static Contact fetchUserinfo(id conId){
      return ([select id,
                      FirstName,
                     LastName,
                     Designation__c,
                     Technology__c,
                     Social_Media_Link__c,
                     Interests__c
                     FROM Contact WHERE id =: conId]);
        
    }

//Get Certification Information 
@AuraEnabled
    public static List<Certificate__c> fetchCertiInfo(id conId){
        return ([SELECT Name, Link__c, Valid_Till__c FROM Certificate__c WHERE certi__c=:conId]);
    }

//Get Emergency Contact
 @AuraEnabled
    public static Contact fetchEmergencyContact(Id conId){
        List<Contact> emergencyContact = [SELECT Emergency_Contact__c FROM Contact WHERE Id =: conId];
        Id x = emergencyContact.get(0).Emergency_Contact__c;
        return [SELECT Name, Email, Phone, Relationship__c FROM Contact WHERE Id =: x];
    }

//Search Contact Details    
 @AuraEnabled
    public static List<Contact> fetchContactFromSearch(String skey)
    {
        String matching = skey + '%';
        return [SELECT Name FROM Contact WHERE Name LIKE :matching];
    }

//Add Certificate Modal
 @AuraEnabled
 public static Certificate__c AddCerti(string NewName, String NewLink, String NewDate, id conId){
        System.debug(NewLink);
        System.debug(NewDate);
    //Change String format to Date         
      String[] strDate = NewDate.split('-');
      Integer myIntDate = integer.valueOf(strDate[2]);
      Integer myIntMonth = integer.valueOf(strDate[1]);
      Integer myIntYear = integer.valueOf(strDate[0]);
      Date d = Date.newInstance(myIntYear, myIntMonth, myIntDate);
        System.debug(d);
        Certificate__c c = new Certificate__c();
        c.Name = NewName;
        c.Link__c=NewLink;
        c.Valid_Till__c=d;
        c.Certi__c = conId;

        try
        {
            insert c;
            return c;
        }
        catch(exception ex)
        {
            System.debug('Failed!');
            return null;
        }
        
        }

}
