'use strict';


/* test the controller */
describe('myApp.gallery module', ['$rootScope', function ($rootScope) {

    module(function ($provide) {
        $provide.factory('GallerySvc', ['$q', function ($q) {
            function save(data) {
                if (passPromise) {
                    return $q.when();
                } else {
                    return $q.reject();
                }
            }

            function query () {
                var result = [{"name":"Vhay Studio","id":"1","description":"This is Erica Vhay's studio. Open by appointment.","location":"Flagstaff, AZ","latitude":"","longitude":"","contact":"Darryl Brown","tagline":"","styleId":null,"email":"info@ericavhay.com","phone":"928-255-8884","website":"http:\/\/www.ericavhay.com","active":true,"imageUrl":"https:\/\/www.rest.ericavhay.com\/images\/uploads\/homeward.1.jpg","works":[{"name":"homeword","id":"528","height":"12","width":"12","notes":"oil on boardd","date":"2016-02-26","soldDate":null,"displayOrder":"1","galleryId":"1","styleId":"2","price":"460","url":null,"archive":false,"sold":false,"featured":true,"style":"portrait","imageUrl":"https:\/\/www.rest.ericavhay.com\/images\/uploads\/homeward.1.jpg"},{"name":"west","id":"525","height":"40","width":"30","notes":"","date":"2016-02-23","soldDate":"0000-00-00","displayOrder":"1","galleryId":"1","styleId":"2","price":"2290","url":null,"archive":false,"sold":false,"featured":true,"style":"portrait","imageUrl":"https:\/\/www.rest.ericavhay.com\/images\/uploads\/west_40x30.jpg"},{"name":"secret","id":"524","height":"36","width":"24","notes":"","date":"2016-02-18","soldDate":"0000-00-00","displayOrder":"1","galleryId":"1","styleId":"2","price":"1840","url":null,"archive":false,"sold":false,"featured":true,"style":"portrait","imageUrl":"https:\/\/www.rest.ericavhay.com\/images\/uploads\/secret.jpg"},{"name":"repose","id":"522","height":"36","width":"48","notes":"","date":"2016-02-16","soldDate":"0000-00-00","displayOrder":"1","galleryId":"1","styleId":"2","price":"3270","url":null,"archive":false,"sold":false,"featured":true,"style":"portrait","imageUrl":"https:\/\/www.rest.ericavhay.com\/images\/uploads\/repose_36x48.jpg"},{"name":"ease ","id":"519","height":"30","width":"30","notes":"","date":"2016-02-01","soldDate":"0000-00-00","displayOrder":"1","galleryId":"1","styleId":"2","price":"1900","url":null,"archive":false,"sold":false,"featured":true,"style":"portrait","imageUrl":"https:\/\/www.rest.ericavhay.com\/images\/uploads\/ease_30x30.jpg"},{"name":"6 a.m.","id":"517","height":"24","width":"24","notes":"","date":"2016-01-11","soldDate":"0000-00-00","displayOrder":"1","galleryId":"1","styleId":"2","price":"1330","url":null,"archive":false,"sold":false,"featured":true,"style":"portrait","imageUrl":"https:\/\/www.rest.ericavhay.com\/images\/uploads\/6am_24x24.jpg"},{"name":"saturday night","id":"523","height":"24","width":"18","notes":"","date":"2016-01-11","soldDate":"0000-00-00","displayOrder":"1","galleryId":"1","styleId":"2","price":"1010","url":null,"archive":false,"sold":false,"featured":true,"style":"portrait","imageUrl":"https:\/\/www.rest.ericavhay.com\/images\/uploads\/saturdaynight_24x18.jpg"},{"name":"afternoon train","id":"518","height":"24","width":"24","notes":"","date":"2016-01-04","soldDate":"0000-00-00","displayOrder":"1","galleryId":"1","styleId":"2","price":"1330","url":null,"archive":false,"sold":false,"featured":true,"style":"portrait","imageUrl":"https:\/\/www.rest.ericavhay.com\/images\/uploads\/afternoontrain_24x24.jpg"},{"name":"black boots","id":"503","height":"20","width":"16","notes":"oil on board","date":"2016-01-01","soldDate":"0000-00-00","displayOrder":"1","galleryId":"1","styleId":"2","price":"800","url":null,"archive":false,"sold":false,"featured":true,"style":"portrait","imageUrl":"https:\/\/www.rest.ericavhay.com\/images\/uploads\/blackboots.jpg"},{"name":"early evening","id":"410","height":"12","width":"16","notes":"","date":"2014-10-28","soldDate":"2014-11-12","displayOrder":"1","galleryId":"1","styleId":"2","price":"1210","url":null,"archive":false,"sold":true,"featured":false,"style":"portrait","imageUrl":"https:\/\/www.rest.ericavhay.com\/images\/uploads\/waiter16x12.jpg"},{"name":"3 blueberries with yellow","id":"392","height":"8","width":"8","notes":"","date":"2014-07-30","soldDate":"2015-11-16","displayOrder":"1","galleryId":"1","styleId":"3","price":"280","url":null,"archive":false,"sold":false,"featured":false,"style":"edibles","imageUrl":"https:\/\/www.rest.ericavhay.com\/images\/uploads\/3blueberrieswithyellow8x8.jpg"},{"name":"5 blueberries with green","id":"397","height":"60","width":"60","notes":"","date":"2014-07-30","soldDate":"0000-00-00","displayOrder":"1","galleryId":"1","styleId":"3","price":"6350","url":null,"archive":false,"sold":false,"featured":true,"style":"edibles","imageUrl":"https:\/\/www.rest.ericavhay.com\/images\/uploads\/5blueberrieswithgreen60x60.jpg"},{"name":"reflection","id":"364","height":"24","width":"20","notes":"","date":"2014-05-30","soldDate":"0000-00-00","displayOrder":"1","galleryId":"1","styleId":"2","price":"1190","url":null,"archive":false,"sold":false,"featured":false,"style":"portrait","imageUrl":"https:\/\/www.rest.ericavhay.com\/images\/uploads\/reflection20x24.jpg"},{"name":"Shoulder Ride","id":"327","height":"30","width":"24","notes":"Photo by August Brill","date":"2014-01-25","soldDate":"0000-00-00","displayOrder":"1","galleryId":"1","styleId":null,"price":"1500","url":null,"archive":false,"sold":false,"featured":false,"imageUrl":"https:\/\/www.rest.ericavhay.com\/images\/uploads\/12814ShoulderRide24x30_72ppi.jpg"},{"name":"juniper","id":"271","height":"24","width":"18","notes":"oil on canvas","date":"2013-10-25","soldDate":"0000-00-00","displayOrder":"0","galleryId":"1","styleId":"2","price":"1083","url":null,"archive":false,"sold":false,"featured":false,"style":"portrait","imageUrl":"https:\/\/www.rest.ericavhay.com\/images\/uploads\/102513juniper_18x24.jpg"},{"name":"pigtails","id":"379","height":"24","width":"18","notes":"","date":"2013-09-19","soldDate":"0000-00-00","displayOrder":"1","galleryId":"1","styleId":"2","price":"1085","url":null,"archive":false,"sold":false,"featured":false,"style":"portrait","imageUrl":"https:\/\/www.rest.ericavhay.com\/images\/uploads\/102513womaininpigtails.jpg"},{"name":"this morning","id":"214","height":"24","width":"18","notes":"","date":"2013-08-22","soldDate":"0000-00-00","displayOrder":"0","galleryId":"1","styleId":"2","price":"1083","url":null,"archive":false,"sold":false,"featured":false,"style":"portrait","imageUrl":"https:\/\/www.rest.ericavhay.com\/images\/uploads\/10413thisMorning_18x24.1.jpg"}]},{"name":"Urban Nest","id":"2","description":"Urban Nest is located in downtown Flagstaff, Arizona. Our goals are simple: We like art and want to share art with others. We represent emerging and established artists who will work with us to encourage and inspire the community and the individual to seek out, explore and appreciate the artistic endeavor. ","location":"111 E Aspen Ave, #2Flagstaff, Arizona 86001","latitude":"","longitude":"","contact":"(928) 600-2113","tagline":"","styleId":null,"email":"","phone":"","website":"","active":false,"imageUrl":"https:\/\/www.rest.ericavhay.com\/images\/uploads\/10413newDress_18x24.jpg","works":[{"name":"new dress","id":"208","height":"24","width":"18","notes":"","date":"2013-09-01","soldDate":"2013-12-01","displayOrder":"0","galleryId":"2","styleId":"2","price":"750","url":null,"archive":false,"sold":true,"featured":false,"style":"portrait","imageUrl":"https:\/\/www.rest.ericavhay.com\/images\/uploads\/10413newDress_18x24.jpg"},{"name":"about tonight","id":"181","height":"10","width":"10","notes":"","date":"2013-07-23","soldDate":"2013-10-23","displayOrder":"0","galleryId":"2","styleId":"2","price":"290","url":null,"archive":false,"sold":true,"featured":false,"style":"portrait","imageUrl":"https:\/\/www.rest.ericavhay.com\/images\/uploads\/aboutTonight10x10.jpg"}]},{"name":"Center for the Arts","id":"4","description":"Coconino Center for the Arts, the cultural hub of the Flagstaff community. The 4,000 sq. ft. gallery features diverse exhibitions, and the intimate 200-seat theater offers concerts, performances, films and other presentations. See the sidebar to the left for current events, and be sure to check the Calendar of events for a detailed listing of all events at the Coconino Center for the Arts.","location":"2300 North Fort Valley Road Flagstaff, AZ","latitude":"","longitude":"","contact":"928-779-2300 jtannous@culturalpartners.org","tagline":"","styleId":null,"email":"","phone":"","website":"","active":false,"imageUrl":"https:\/\/www.rest.ericavhay.com\/images\/uploads\/between.jpg","works":[{"name":"between","id":"179","height":"30","width":"24","notes":"","date":"2013-07-20","soldDate":"2013-10-20","displayOrder":"0","galleryId":"4","styleId":"2","price":"1100","url":null,"archive":false,"sold":true,"featured":false,"style":"portrait","imageUrl":"https:\/\/www.rest.ericavhay.com\/images\/uploads\/between.jpg"}]},{"name":"brix","id":"7","description":"","location":"413 N San Francisco St, Flagstaff, AZ 86001","latitude":"","longitude":"","contact":"Mike Murator","tagline":"","styleId":null,"email":"info@ericavhay.com","phone":"(602) 930-7598","website":"","active":true,"imageUrl":"https:\/\/www.rest.ericavhay.com\/images\/uploads\/bright_20x16.jpg","works":[{"name":"bright light","id":"520","height":"20","width":"16","notes":"oil on board","date":"2016-01-20","soldDate":"0000-00-00","displayOrder":"1","galleryId":"7","styleId":"2","price":"800","url":null,"archive":false,"sold":false,"featured":true,"style":"portrait","imageUrl":"https:\/\/www.rest.ericavhay.com\/images\/uploads\/bright_20x16.jpg"},{"name":"late afternoon","id":"527","height":"20","width":"16","notes":"oil on board","date":"2016-01-01","soldDate":null,"displayOrder":"1","galleryId":"7","styleId":"2","price":"800","url":null,"archive":false,"sold":false,"featured":true,"style":"portrait","imageUrl":"https:\/\/www.rest.ericavhay.com\/images\/uploads\/lateafternooon_20x16.1.jpg"},{"name":"curtsy","id":"497","height":"40","width":"30","notes":"","date":"2015-12-08","soldDate":"2016-02-23","displayOrder":"1","galleryId":"7","styleId":"2","price":"2440","url":null,"archive":false,"sold":true,"featured":true,"style":"portrait","imageUrl":"https:\/\/www.rest.ericavhay.com\/images\/uploads\/curtsy_40x30_300ppi.jpg"},{"name":"red scarf","id":"492","height":"30","width":"10","notes":"","date":"2015-10-07","soldDate":"0000-00-00","displayOrder":"1","galleryId":"7","styleId":"2","price":"850","url":null,"archive":false,"sold":false,"featured":true,"style":"portrait","imageUrl":"https:\/\/www.rest.ericavhay.com\/images\/uploads\/redscarf30x10.jpg"},{"name":"yesterday","id":"455","height":"36","width":"36","notes":"","date":"2015-02-27","soldDate":"0000-00-00","displayOrder":"1","galleryId":"7","styleId":"2","price":"2450","url":null,"archive":false,"sold":false,"featured":true,"style":"portrait","imageUrl":"https:\/\/www.rest.ericavhay.com\/images\/uploads\/yesterday36x36.jpg"},{"name":"through the bathroom window","id":"445","height":"36","width":"48","notes":"","date":"2015-02-05","soldDate":"0000-00-00","displayOrder":"1","galleryId":"7","styleId":"2","price":"3130","url":null,"archive":false,"sold":false,"featured":true,"style":"portrait","imageUrl":"https:\/\/www.rest.ericavhay.com\/images\/uploads\/throughthebathroomwindow36x48300ppi.jpg"},{"name":"hubris","id":"402","height":"20","width":"24","notes":"","date":"2014-09-17","soldDate":"0000-00-00","displayOrder":"1","galleryId":"7","styleId":"2","price":"1580","url":null,"archive":false,"sold":false,"featured":true,"style":"portrait","imageUrl":"https:\/\/www.rest.ericavhay.com\/images\/uploads\/img2026copy.jpg"},{"name":"6 blueberries with yellow","id":"395","height":"8","width":"8","notes":"","date":"2014-07-30","soldDate":"0000-00-00","displayOrder":"1","galleryId":"7","styleId":"3","price":"470","url":null,"archive":false,"sold":false,"featured":true,"style":"edibles","imageUrl":"https:\/\/www.rest.ericavhay.com\/images\/uploads\/6bbswithyellow8x8.jpg"},{"name":"7 blueberries with light green","id":"396","height":"11","width":"14","notes":"","date":"2014-07-30","soldDate":"0000-00-00","displayOrder":"1","galleryId":"7","styleId":"3","price":"760","url":null,"archive":false,"sold":false,"featured":true,"style":"edibles","imageUrl":"https:\/\/www.rest.ericavhay.com\/images\/uploads\/7bbswithlightgreen14x11.jpg"},{"name":"april 1st","id":"355","height":"5","width":"5","notes":"","date":"2014-04-01","soldDate":"0000-00-00","displayOrder":"1","galleryId":"7","styleId":"6","price":"200","url":null,"archive":false,"sold":false,"featured":false,"style":"florals","imageUrl":"https:\/\/www.rest.ericavhay.com\/images\/uploads\/april1st_22514_8x8.jpg"},{"name":"april 3rd","id":"357","height":"5","width":"5","notes":"","date":"2014-04-01","soldDate":"0000-00-00","displayOrder":"1","galleryId":"7","styleId":"6","price":"200","url":null,"archive":false,"sold":false,"featured":false,"style":"florals","imageUrl":"https:\/\/www.rest.ericavhay.com\/images\/uploads\/april3rd_22114_8x8.jpg"},{"name":"The Fair","id":"323","height":"48","width":"36","notes":"Vintage photo ","date":"2014-02-07","soldDate":"0000-00-00","displayOrder":"1","galleryId":"7","styleId":"2","price":"3150","url":null,"archive":false,"sold":false,"featured":false,"style":"portrait","imageUrl":"https:\/\/www.rest.ericavhay.com\/images\/uploads\/2714atTheFair36x48_72ppi.jpg"},{"name":"montana in January","id":"352","height":"8","width":"8","notes":"","date":"2014-01-31","soldDate":"0000-00-00","displayOrder":"1","galleryId":"7","styleId":"1","price":"230","url":null,"archive":false,"sold":false,"featured":false,"style":"landscape","imageUrl":"https:\/\/www.rest.ericavhay.com\/images\/uploads\/122013montanaInJanuary8x8_72ppi.1.jpg"},{"name":"evening swim","id":"387","height":"18","width":"24","notes":"","date":"2014-01-15","soldDate":"2015-02-10","displayOrder":"1","galleryId":"7","styleId":"2","price":"1110","url":null,"archive":false,"sold":false,"featured":false,"style":"portrait","imageUrl":"https:\/\/www.rest.ericavhay.com\/images\/uploads\/eveningswim24x18.jpg"},{"name":"wyoming bovine 2","id":"384","height":"8","width":"10","notes":"","date":"2013-10-16","soldDate":"0000-00-00","displayOrder":"1","galleryId":"7","styleId":"1","price":"370","url":null,"archive":false,"sold":false,"featured":false,"style":"landscape","imageUrl":"https:\/\/www.rest.ericavhay.com\/images\/uploads\/wyomingbovine2.jpg"},{"name":"black coat","id":"385","height":"14","width":"11","notes":"","date":"2013-09-11","soldDate":"0000-00-00","displayOrder":"1","galleryId":"7","styleId":"2","price":"530","url":null,"archive":false,"sold":false,"featured":false,"style":"portrait","imageUrl":"https:\/\/www.rest.ericavhay.com\/images\/uploads\/blackcoat11x14.jpg"},{"name":"night poppies","id":"177","height":"30","width":"30","notes":"","date":"2013-06-07","soldDate":"0000-00-00","displayOrder":"0","galleryId":"7","styleId":"6","price":"2300","url":null,"archive":false,"sold":false,"featured":false,"style":"florals","imageUrl":"https:\/\/www.rest.ericavhay.com\/images\/uploads\/nightPoppies30x30_300ppi.jpg"},{"name":"onion","id":"398","height":"48","width":"48","notes":"","date":"2012-12-19","soldDate":"0000-00-00","displayOrder":"1","galleryId":"7","styleId":"3","price":"4120","url":null,"archive":false,"sold":false,"featured":false,"style":"edibles","imageUrl":"https:\/\/www.rest.ericavhay.com\/images\/uploads\/onion2.jpg"},{"name":"Eugene","id":"485","height":"14","width":"11","notes":"","date":"2012-09-04","soldDate":"0000-00-00","displayOrder":"1","galleryId":"7","styleId":"2","price":"530","url":null,"archive":false,"sold":false,"featured":false,"style":"portrait","imageUrl":"https:\/\/www.rest.ericavhay.com\/images\/uploads\/sargentstudy2.jpg"}]},{"name":"RARE galley","id":"11","description":"","location":"60 e broadway, jackson, wyoming, 83001","latitude":"43.4795714","longitude":"-110.7612537","contact":"Hollee Armstrong","tagline":"RARE gallery of fine art \/ Jackson Hole","styleId":null,"email":"holleea@gmail.com","phone":" 307-733-8726","website":"http:\/\/raregalleryjacksonhole.com","active":true,"imageUrl":"https:\/\/www.rest.ericavhay.com\/images\/uploads\/greenshoes12x12.jpg","works":[{"name":"green shoes","id":"489","height":"12","width":"12","notes":"","date":"2015-10-30","soldDate":"0000-00-00","displayOrder":"1","galleryId":"11","styleId":"2","price":"510","url":null,"archive":false,"sold":false,"featured":true,"style":"portrait","imageUrl":"https:\/\/www.rest.ericavhay.com\/images\/uploads\/greenshoes12x12.jpg"},{"name":"wednesday morning","id":"493","height":"12","width":"12","notes":"","date":"2015-10-01","soldDate":"0000-00-00","displayOrder":"1","galleryId":"11","styleId":"2","price":"510","url":null,"archive":false,"sold":false,"featured":true,"style":"portrait","imageUrl":"https:\/\/www.rest.ericavhay.com\/images\/uploads\/wednesdaymorning.jpg"},{"name":"red sweater 1","id":"375","height":"48","width":"36","notes":"","date":"2014-06-02","soldDate":"0000-00-00","displayOrder":"1","galleryId":"11","styleId":"2","price":"3800","url":null,"archive":false,"sold":false,"featured":true,"style":"portrait","imageUrl":"https:\/\/www.rest.ericavhay.com\/images\/uploads\/redsweater3.jpg"},{"name":"red sweater 3","id":"377","height":"48","width":"36","notes":"","date":"2014-06-01","soldDate":"0000-00-00","displayOrder":"1","galleryId":"11","styleId":"2","price":"3280","url":null,"archive":false,"sold":false,"featured":true,"style":"portrait","imageUrl":"https:\/\/www.rest.ericavhay.com\/images\/uploads\/redsweater.jpg"},{"name":"hoop skirt 2","id":"370","height":"48","width":"36","notes":"","date":"2014-05-06","soldDate":"0000-00-00","displayOrder":"1","galleryId":"11","styleId":"2","price":"3880","url":null,"archive":false,"sold":false,"featured":true,"style":"portrait","imageUrl":"https:\/\/www.rest.ericavhay.com\/images\/uploads\/hoopskirt236x48.jpg"},{"name":"hoop skirt 1","id":"371","height":"48","width":"36","notes":"","date":"2014-05-05","soldDate":"0000-00-00","displayOrder":"1","galleryId":"11","styleId":"2","price":"3830","url":null,"archive":false,"sold":false,"featured":true,"style":"portrait","imageUrl":"https:\/\/www.rest.ericavhay.com\/images\/uploads\/hoopskirt136x48.jpg"},{"name":"nude 2","id":"367","height":"20","width":"16","notes":"","date":"2014-05-03","soldDate":"0000-00-00","displayOrder":"1","galleryId":"11","styleId":"2","price":"1720","url":null,"archive":false,"sold":false,"featured":true,"style":"portrait","imageUrl":"https:\/\/www.rest.ericavhay.com\/images\/uploads\/nude216x20.jpg"}]},{"name":"Abend Gallery","id":"13","description":"nnn","location":"2260 e colfax, denver colorado","latitude":"39.739760","longitude":"-104.960022","contact":"303.355.0950","tagline":"Fine Art","styleId":null,"email":"","phone":"303.355.0950","website":"http:\/\/www.abendgallery.com\/","active":false},{"name":"Marshall Gallery","id":"14","description":"","location":"7106 E. Main St., Scottsdale, Az 85251","latitude":"","longitude":"","contact":"Janet Sandino","tagline":"","styleId":null,"email":"email@themarshallgallery.com","phone":"480-970-3111","website":"http:\/\/www.themarshallgallery.com\/artists\/erica-vhay\/","active":true,"imageUrl":"https:\/\/www.rest.ericavhay.com\/images\/uploads\/city.jpg","works":[{"name":"urban canyon","id":"504","height":"36","width":"60","notes":"oil on wood","date":"2016-02-05","soldDate":"0000-00-00","displayOrder":"1","galleryId":"14","styleId":"1","price":"3800","url":null,"archive":false,"sold":false,"featured":true,"style":"landscape","imageUrl":"https:\/\/www.rest.ericavhay.com\/images\/uploads\/city.jpg"},{"name":"after the rain","id":"505","height":"30","width":"30","notes":"oil on wood","date":"2016-02-05","soldDate":"0000-00-00","displayOrder":"1","galleryId":"14","styleId":"1","price":"2010","url":null,"archive":false,"sold":false,"featured":true,"style":"landscape","imageUrl":"https:\/\/www.rest.ericavhay.com\/images\/uploads\/crosswalk.jpg"},{"name":"state street","id":"506","height":"48","width":"48","notes":"oil on wood","date":"2016-02-05","soldDate":"0000-00-00","displayOrder":"1","galleryId":"14","styleId":"1","price":"4020","url":null,"archive":false,"sold":false,"featured":true,"style":"landscape","imageUrl":"https:\/\/www.rest.ericavhay.com\/images\/uploads\/umbrellascrossing.jpg"},{"name":"emmy","id":"502","height":"40","width":"30","notes":"oil on board","date":"2016-01-13","soldDate":"0000-00-00","displayOrder":"1","galleryId":"14","styleId":"2","price":"2290","url":null,"archive":false,"sold":false,"featured":true,"style":"portrait","imageUrl":"https:\/\/www.rest.ericavhay.com\/images\/uploads\/image.jpg"},{"name":"downtown","id":"499","height":"60","width":"60","notes":"oil on canvas","date":"2015-12-17","soldDate":"2016-02-18","displayOrder":"1","galleryId":"14","styleId":"1","price":"5990","url":null,"archive":false,"sold":true,"featured":true,"style":"landscape","imageUrl":"https:\/\/www.rest.ericavhay.com\/images\/uploads\/downtown_60x60.jpg"},{"name":"autumn","id":"498","height":"20","width":"16","notes":"oil on board","date":"2015-12-01","soldDate":"2016-01-02","displayOrder":"1","galleryId":"14","styleId":"2","price":"940","url":null,"archive":false,"sold":true,"featured":true,"style":"portrait","imageUrl":"https:\/\/www.rest.ericavhay.com\/images\/uploads\/autumn_20x16_300ppi.jpg"},{"name":"earlier today","id":"488","height":"36","width":"36","notes":"","date":"2015-10-28","soldDate":"0000-00-00","displayOrder":"1","galleryId":"14","styleId":"1","price":"2550","url":null,"archive":false,"sold":false,"featured":true,"style":"landscape","imageUrl":"https:\/\/www.rest.ericavhay.com\/images\/uploads\/earliertoday.jpg"},{"name":"5:05 pm","id":"486","height":"48","width":"36","notes":"","date":"2015-10-21","soldDate":"0000-00-00","displayOrder":"1","galleryId":"14","styleId":"1","price":"3260","url":null,"archive":false,"sold":false,"featured":true,"style":"landscape","imageUrl":"https:\/\/www.rest.ericavhay.com\/images\/uploads\/afternoontrain48x36.jpg"},{"name":"lola","id":"491","height":"36","width":"36","notes":"","date":"2015-10-18","soldDate":"0000-00-00","displayOrder":"1","galleryId":"14","styleId":"2","price":"2600","url":null,"archive":false,"sold":false,"featured":true,"style":"portrait","imageUrl":"https:\/\/www.rest.ericavhay.com\/images\/uploads\/reddress36x36.jpg"},{"name":"5:10 pm","id":"487","height":"48","width":"36","notes":"","date":"2015-10-15","soldDate":"0000-00-00","displayOrder":"1","galleryId":"14","styleId":"1","price":"3260","url":null,"archive":false,"sold":false,"featured":true,"style":"landscape","imageUrl":"https:\/\/www.rest.ericavhay.com\/images\/uploads\/afternoontrain248x36.jpg"},{"name":"friday morning","id":"483","height":"60","width":"60","notes":"oil on canvas","date":"2015-09-16","soldDate":"2015-12-25","displayOrder":"1","galleryId":"14","styleId":"1","price":"6500","url":null,"archive":false,"sold":true,"featured":true,"style":"landscape","imageUrl":"https:\/\/www.rest.ericavhay.com\/images\/uploads\/fridayam.jpg"},{"name":"fence line","id":"470","height":"30","width":"30","notes":"","date":"2015-05-01","soldDate":"0000-00-00","displayOrder":"1","galleryId":"14","styleId":"7","price":"1810","url":null,"archive":false,"sold":false,"featured":true,"style":"abstract","imageUrl":"https:\/\/www.rest.ericavhay.com\/images\/uploads\/fenceline.jpg"}]}]
                result = [];
                return result;
            }

            function get() {
                var result = {
                    "name": "Marshall Gallery",
                    "id": "14",
                    "description": "",
                    "location": "7106 E. Main St., Scottsdale, Az 85251",
                    "latitude": "",
                    "longitude": "",
                    "contact": "Janet Sandino",
                    "tagline": "",
                    "styleId": null,
                    "email": "email@themarshallgallery.com",
                    "phone": "480-970-3111",
                    "website": "http:\/\/www.themarshallgallery.com\/artists\/erica-vhay\/",
                    "active": true,
                    "imageUrl": "https:\/\/www.rest.ericavhay.com\/images\/uploads\/city.jpg",
                    "works": [{
                        "name": "urban canyon",
                        "id": "504",
                        "height": "36",
                        "width": "60",
                        "notes": "oil on wood",
                        "date": "2016-02-05",
                        "soldDate": "0000-00-00",
                        "displayOrder": "1",
                        "galleryId": "14",
                        "styleId": "1",
                        "price": "3800",
                        "url": null,
                        "archive": false,
                        "sold": false,
                        "featured": true,
                        "style": "landscape",
                        "imageUrl": "https:\/\/www.rest.ericavhay.com\/images\/uploads\/city.jpg"
                    }, {
                        "name": "after the rain",
                        "id": "505",
                        "height": "30",
                        "width": "30",
                        "notes": "oil on wood",
                        "date": "2016-02-05",
                        "soldDate": "0000-00-00",
                        "displayOrder": "1",
                        "galleryId": "14",
                        "styleId": "1",
                        "price": "2010",
                        "url": null,
                        "archive": false,
                        "sold": false,
                        "featured": true,
                        "style": "landscape",
                        "imageUrl": "https:\/\/www.rest.ericavhay.com\/images\/uploads\/crosswalk.jpg"
                    }, {
                        "name": "state street",
                        "id": "506",
                        "height": "48",
                        "width": "48",
                        "notes": "oil on wood",
                        "date": "2016-02-05",
                        "soldDate": "0000-00-00",
                        "displayOrder": "1",
                        "galleryId": "14",
                        "styleId": "1",
                        "price": "4020",
                        "url": null,
                        "archive": false,
                        "sold": false,
                        "featured": true,
                        "style": "landscape",
                        "imageUrl": "https:\/\/www.rest.ericavhay.com\/images\/uploads\/umbrellascrossing.jpg"
                    }, {
                        "name": "emmy",
                        "id": "502",
                        "height": "40",
                        "width": "30",
                        "notes": "oil on board",
                        "date": "2016-01-13",
                        "soldDate": "0000-00-00",
                        "displayOrder": "1",
                        "galleryId": "14",
                        "styleId": "2",
                        "price": "2290",
                        "url": null,
                        "archive": false,
                        "sold": false,
                        "featured": true,
                        "style": "portrait",
                        "imageUrl": "https:\/\/www.rest.ericavhay.com\/images\/uploads\/image.jpg"
                    }, {
                        "name": "downtown",
                        "id": "499",
                        "height": "60",
                        "width": "60",
                        "notes": "oil on canvas",
                        "date": "2015-12-17",
                        "soldDate": "2016-02-18",
                        "displayOrder": "1",
                        "galleryId": "14",
                        "styleId": "1",
                        "price": "5990",
                        "url": null,
                        "archive": false,
                        "sold": true,
                        "featured": true,
                        "style": "landscape",
                        "imageUrl": "https:\/\/www.rest.ericavhay.com\/images\/uploads\/downtown_60x60.jpg"
                    }, {
                        "name": "autumn",
                        "id": "498",
                        "height": "20",
                        "width": "16",
                        "notes": "oil on board",
                        "date": "2015-12-01",
                        "soldDate": "2016-01-02",
                        "displayOrder": "1",
                        "galleryId": "14",
                        "styleId": "2",
                        "price": "940",
                        "url": null,
                        "archive": false,
                        "sold": true,
                        "featured": true,
                        "style": "portrait",
                        "imageUrl": "https:\/\/www.rest.ericavhay.com\/images\/uploads\/autumn_20x16_300ppi.jpg"
                    }, {
                        "name": "earlier today",
                        "id": "488",
                        "height": "36",
                        "width": "36",
                        "notes": "",
                        "date": "2015-10-28",
                        "soldDate": "0000-00-00",
                        "displayOrder": "1",
                        "galleryId": "14",
                        "styleId": "1",
                        "price": "2550",
                        "url": null,
                        "archive": false,
                        "sold": false,
                        "featured": true,
                        "style": "landscape",
                        "imageUrl": "https:\/\/www.rest.ericavhay.com\/images\/uploads\/earliertoday.jpg"
                    }, {
                        "name": "5:05 pm",
                        "id": "486",
                        "height": "48",
                        "width": "36",
                        "notes": "",
                        "date": "2015-10-21",
                        "soldDate": "0000-00-00",
                        "displayOrder": "1",
                        "galleryId": "14",
                        "styleId": "1",
                        "price": "3260",
                        "url": null,
                        "archive": false,
                        "sold": false,
                        "featured": true,
                        "style": "landscape",
                        "imageUrl": "https:\/\/www.rest.ericavhay.com\/images\/uploads\/afternoontrain48x36.jpg"
                    }, {
                        "name": "lola",
                        "id": "491",
                        "height": "36",
                        "width": "36",
                        "notes": "",
                        "date": "2015-10-18",
                        "soldDate": "0000-00-00",
                        "displayOrder": "1",
                        "galleryId": "14",
                        "styleId": "2",
                        "price": "2600",
                        "url": null,
                        "archive": false,
                        "sold": false,
                        "featured": true,
                        "style": "portrait",
                        "imageUrl": "https:\/\/www.rest.ericavhay.com\/images\/uploads\/reddress36x36.jpg"
                    }, {
                        "name": "5:10 pm",
                        "id": "487",
                        "height": "48",
                        "width": "36",
                        "notes": "",
                        "date": "2015-10-15",
                        "soldDate": "0000-00-00",
                        "displayOrder": "1",
                        "galleryId": "14",
                        "styleId": "1",
                        "price": "3260",
                        "url": null,
                        "archive": false,
                        "sold": false,
                        "featured": true,
                        "style": "landscape",
                        "imageUrl": "https:\/\/www.rest.ericavhay.com\/images\/uploads\/afternoontrain248x36.jpg"
                    }, {
                        "name": "friday morning",
                        "id": "483",
                        "height": "60",
                        "width": "60",
                        "notes": "oil on canvas",
                        "date": "2015-09-16",
                        "soldDate": "2015-12-25",
                        "displayOrder": "1",
                        "galleryId": "14",
                        "styleId": "1",
                        "price": "6500",
                        "url": null,
                        "archive": false,
                        "sold": true,
                        "featured": true,
                        "style": "landscape",
                        "imageUrl": "https:\/\/www.rest.ericavhay.com\/images\/uploads\/fridayam.jpg"
                    }, {
                        "name": "fence line",
                        "id": "470",
                        "height": "30",
                        "width": "30",
                        "notes": "",
                        "date": "2015-05-01",
                        "soldDate": "0000-00-00",
                        "displayOrder": "1",
                        "galleryId": "14",
                        "styleId": "7",
                        "price": "1810",
                        "url": null,
                        "archive": false,
                        "sold": false,
                        "featured": true,
                        "style": "abstract",
                        "imageUrl": "https:\/\/www.rest.ericavhay.com\/images\/uploads\/fenceline.jpg"
                    }]
                }
                result = {};
                return result;
            }

            return {
                save: save
            };
        }]);
    });


    beforeEach(inject(function ($controller, $rootScope, GallerySvc) {
        var scope = $rootScope.$new();// get a child scope
        var galleryCtrl = $controller('GalleryCtrl', {
            $scope: scope,
            Gallery: GallerySvc
        });

    }));

    describe('gallery controller', function () {

        it('should ....', function () {
            //spec body
            expect(galleryCtrl).toBeDefined();
        });

    });
}]);

/* test the service */

