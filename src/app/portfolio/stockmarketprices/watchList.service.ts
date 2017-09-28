import { Injectable } from '@angular/core';
import { Ticker, ITicker } from './watchList';

@Injectable()
export class WatchListService {
    constructor() { }

    getWatchList(): ITicker[] {
        let listToReturn = new Array<Ticker>();
       
        listToReturn.push(this.getApple());
        listToReturn.push(this.getAmazon());
        listToReturn.push(this.getAppliedMaterials());

        listToReturn.push(this.getCisco());
        listToReturn.push(this.getEbay());
        listToReturn.push(this.getFacebook());


        listToReturn.push(this.getGoogle());
        listToReturn.push(this.getIbm());
        listToReturn.push(this.getIntel());

        listToReturn.push(this.getMicrosoft());
        listToReturn.push(this.getNetFlix());
        listToReturn.push(this.getTesla());
        
        return listToReturn;
    }


    getApple(): ITicker {
        let valueToReturn = new Ticker('AAPL',
            'APPLE',
            153.28,
            'NASDAQ-GS',
            164.94,
            104.08,
            'ELECTRONIC COMPUTERS',
            '791.73B',
            27950000);
        return valueToReturn;
    }

    getAmazon(): ITicker {
        let valueToReturn = new Ticker('AMZN',
            'AMAZON.COM',
            956.4,
            'NASDAQ-GS',
            1083.31,
            710.10,
            'CATALOG AND MAIL-ORDER',
            '459.72B',
            3463395);
        return valueToReturn;
    }

    getAppliedMaterials(): ITicker {
        let valueToReturn = new Ticker('AMAT',
            'APPLIED MATERIALS',
            50.62,
            'NASDAQ-GS',
            49.71,
            27.56,
            'SEMICONDUCTORS',
            '53.15BB',
            9986960 );
        return valueToReturn;
    }

    getCisco(): ITicker {
        let valueToReturn = new Ticker('CSCO',
            'CISCO SYSTEMS',
            33.35,
            'NASDAQ-GS',
            34.60,
            29.12,
            'COMMS EQPT',
            '165.32B',
            20410000 );
        return valueToReturn;
    }

    getEbay(): ITicker {
        let valueToReturn = new Ticker('EBAY',
            'EBAY',
            37.73,
            'NASDAQ-GS',
            38.87,
            27.28,
            'BUSINESS SERVICES',
            '40.78B',
            8170000);
        return valueToReturn;
    }

    getFacebook(): ITicker {
        let valueToReturn = new Ticker('FB',
            'FACEBOOK',
            168.73,
            'NASDAQ-GS',
            175.49,
            113.55,
            'SERVICES',
            '487.32B',
            16501709);
        return valueToReturn;
    }

    getGoogle(): ITicker {
        let valueToReturn = new Ticker('GOOG',
            'GOOGLE',
            949.5,
            'NASDAQ-GS',
            988.25,
            727.54,
            'SERVICES',
            '659.55B',
            1550000);
        return valueToReturn;
    }

    getIbm(): ITicker {
        let valueToReturn = new Ticker('IBM',
            'INTERNATIONAL BUSINESS MACHINES',
            145.66,
            'NYSE',
            182.79,
            139.13,
            'COMPUTER EQUIPMENT',
            '135.75B',
            3970000);
        return valueToReturn;
    }

    getIntel(): ITicker {
        let valueToReturn = new Ticker('INTC',
            'INTEL CORPORATION',
            37.83,
            'NASDAQ-GS',
            38.45,
            33.23,
            'SEMICONDUCTORS',
            '176.4B',
            21899260);
        return valueToReturn;
    }

    getMicrosoft(): ITicker {
        let valueToReturn = new Ticker('MSFT',
            'MICROSOFT CORPORATION',
            73.87,
            'NASDAQ-GS',
            75.97,
            56.31,
            'SOFTWARE',
            '568.81B',
            20940698);
        return valueToReturn;
    }

    getTesla(): ITicker {
        let valueToReturn = new Ticker('TSLA',
            'TESLA',
            339.6,
            'NASDAQ-GS',
            389.61,
            178.19,
            'CAR MANUFACTURER',
            '50.74B',
            6873281);
        return valueToReturn;
    }

    getNetFlix(): ITicker {
        let valueToReturn = new Ticker('NFLX',
            'NETFLIX',
            180.7,
            'NASDAQ-GS',
            191.5,
            96.02,
            'MOVIE RENTAL',
            '77.85B',
            6905321);
        return valueToReturn;
    }

}