//Apex Controller for the Employee101 demo application. Started on : 29 May 2018 Created By:Niyat Vyas 

public with sharing class MyDemoController {

//User name greetings
@AuraEnabled
    public static String getUserName() {
    return userInfo.getName();
     }

//Get User Info for Personal Information    
@AuraEnabled 
    public static id fetchUserinfo(){
        String User_Id=userInfo.getUserId();
        Contact con = [select id FROM Contact WHERE User__c =: User_Id];
        return (con.id);
        
    }
        
@AuraEnabled
    public static Contact fetchAllContacts(){
        return ([SELECT id, FirstName, LastName FROM Contact]);
    }


//Get Certification Information 
@AuraEnabled
    public static List<Certificate__c> fetchCertiInfo(){
        return ([SELECT Id, Name, Link__c, Valid_Till__c FROM Certificate__c WHERE certi__c=:fetchUserinfo()]);
    }

//Get Emergency Contact
 @AuraEnabled
    public static List<Contact> fetchEmergencyContact(Id conId){
       String CurrentUser_Id = UserInfo.getUserId();
        Contact	CurrentUser = [select id from Contact where User__c=:CurrentUser_Id];
			return [select Name,Phone,Email,RelationShip__c from Contact where Emergency_Contact__c =:CurrentUser.Id];
    }



//Search Contact Details    
 @AuraEnabled
    public static List<Contact> fetchContactFromSearch(String skey)
    {
        String matching = skey + '%';
        return [SELECT Name FROM Contact WHERE Name LIKE :matching];
    }

//Add Certificate AND Edit Certificate Method
 @AuraEnabled
 public static Certificate__c AddCerti(Id certiId, string NewName, String NewLink, String NewDate){
//Change String format to Date         
      String[] strDate = NewDate.split('-');
      Integer myIntDate = integer.valueOf(strDate[2]);
      Integer myIntMonth = integer.valueOf(strDate[1]);
      Integer myIntYear = integer.valueOf(strDate[0]);
      Date d = Date.newInstance(myIntYear, myIntMonth, myIntDate);
        Certificate__c c = new Certificate__c();
        c.Name = NewName;
        c.Link__c=NewLink;
        c.Valid_Till__c=d;
        c.Certi__c = fetchUserinfo();
        if(certiId != null||certiId!='') 
            c.Id = certiId;

        try
        {
            upsert c;
            return c;
        }
        catch(exception ex)
        {
            System.debug('Failed!');
            System.debug(ex.getmessage());
            return null;
        }
        
        }

//Map the values of Certificate count to respective contacts
@AuraEnabled      
    public static Map<Id,Integer> getCount()
    {
        Integer count;
        Map<Id,Integer> MyMap = new Map<Id,Integer>();
        List<Certificate__c> certi = [SELECT Id,Certi__c FROM Certificate__c];
        for (Integer i=0;i<certi.size();i++){
             if(MyMap.containsKey(certi[i].Certi__c))
             {
              Integer sum = MyMap.get(certi[i].Certi__c) + 1;
              MyMap.put(certi[i].Certi__c, sum);
             }
             else
             {
              MyMap.put(certi[i].Certi__c, 1);
             }
        }
        
        return MyMap;
    }

//fetch contact details
@AuraEnabled
    public static List<Contact> fetchContacts(){
    return([select id,Name from Contact]);
  }

//fetch information i.e. number of certificates and names for every contact
@AuraEnabled
    public static List<Object> fetchPieInfo(){
        return([select Count(id), Name from Certificate__c Group By Name]);
    } 

}