export const Location = ['India','USA','UK','Australia','Canada',
                        'Ireland','Malaysia','New Zealand','Saudi Arabia','South Africa'];


export class LocationMap{
    getLocationCode(location): string{
        switch(location){
            case 'India'        : return 'in';
            case 'USA'          : return 'us';
            case 'UK'           : return 'uk';
            case 'Australia'    : return 'au';
            case 'Canada'       : return 'ca';
            case 'Ireland'      : return 'ir';
            case 'Malaysia'     : return 'ma';
            case 'New Zealand'  : return 'nz';
            case 'Saudi Arabia' : return 'sau';
            case 'South Africa' : return 'sa';
            default             : return 'in';
        }
    }
}