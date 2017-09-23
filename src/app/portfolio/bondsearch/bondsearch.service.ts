import { Injectable } from '@angular/core';
import { Bond, IBond } from './bond.model';
import { IFilterProperty, FilterProperty } from './filterProperty.model';

@Injectable()
export class BondSearchService {

    constructor() { }

    getBondList(): IBond[] {
        let listToReturn: IBond[] = [];
        for (let item of this.bondPrices) {
            listToReturn.push(new Bond(item));
        };
        this.sortBondListByIsin(listToReturn);
        return listToReturn;
    }

    getBondProperties(): IFilterProperty[] {
        let listToReturn: IFilterProperty[] = [];
        listToReturn.push(new FilterProperty('isin', 'Isin', 'string'));
        listToReturn.push(new FilterProperty('name','Name', 'string'));
        listToReturn.push(new FilterProperty('cleanPrice','Clean Price', 'number'));
        listToReturn.push(new FilterProperty('dirtyPrice','Dirty Price', 'number'));
        listToReturn.push(new FilterProperty('interest','Interest', 'number'));
        listToReturn.push(new FilterProperty('bondYield', 'Yield', 'number'));
        return listToReturn;
    }
    
    private sortBondListByIsin(listToSort: IBond[]): IBond[] {
        listToSort.sort((leftSide, rightSide): number => {
            if (leftSide.isin < rightSide.isin) return -1;
            if (leftSide.isin > rightSide.isin) return 1;
            return 0;
        });
        return listToSort;
    }

    // JSON representation of all the bonds    
    bondPrices = [
        {
            'IsinCode': 'GB0000513878',
            'InstrumentName': '8% Treasury Principal Strip 07Dec2015',
            'CleanPrice': '99.851151000000',
            'DirtyPrice': '99.85115100000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '0.371224000000'
        },
        {
            'IsinCode': 'GB0000513985',
            'InstrumentName': 'Treasury Coupon Strip 07Dec2015',
            'CleanPrice': '99.851151000000',
            'DirtyPrice': '99.85115100000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '0.371224000000'
        },
        {
            'IsinCode': 'GB0000514280',
            'InstrumentName': 'Treasury Coupon Strip 07Jun2016',
            'CleanPrice': '99.591038000000',
            'DirtyPrice': '99.59103800000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '0.455023000000'
        },
        {
            'IsinCode': 'GB0000514405',
            'InstrumentName': 'Treasury Coupon Strip 07Dec2016',
            'CleanPrice': '99.207774000000',
            'DirtyPrice': '99.20777400000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '0.568270000000'
        },
        {
            'IsinCode': 'GB0000514512',
            'InstrumentName': 'Treasury Coupon Strip 07Jun2017',
            'CleanPrice': '98.694049000000',
            'DirtyPrice': '98.69404900000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '0.692470000000'
        },
        {
            'IsinCode': 'GB0000514736',
            'InstrumentName': 'Treasury Coupon Strip 07Dec2017',
            'CleanPrice': '98.042258000000',
            'DirtyPrice': '98.04225800000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '0.824951000000'
        },
        {
            'IsinCode': 'GB0000514843',
            'InstrumentName': 'Treasury Coupon Strip 07Jun2018',
            'CleanPrice': '97.264114000000',
            'DirtyPrice': '97.26411400000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '0.958303000000'
        },
        {
            'IsinCode': 'GB0000514959',
            'InstrumentName': 'Treasury Coupon Strip 07Dec2018',
            'CleanPrice': '96.361918000000',
            'DirtyPrice': '96.36191800000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '1.092421000000'
        },
        {
            'IsinCode': 'GB0000515030',
            'InstrumentName': 'Treasury Coupon Strip 07Jun2019',
            'CleanPrice': '95.360691000000',
            'DirtyPrice': '95.36069100000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '1.221246000000'
        },
        {
            'IsinCode': 'GB0000515147',
            'InstrumentName': 'Treasury Coupon Strip 07Dec2019',
            'CleanPrice': '94.266983000000',
            'DirtyPrice': '94.26698300000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '1.345808000000'
        },
        {
            'IsinCode': 'GB0000515360',
            'InstrumentName': 'Treasury Coupon Strip 07Jun2020',
            'CleanPrice': '93.103975000000',
            'DirtyPrice': '93.10397500000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '1.463069000000'
        },
        {
            'IsinCode': 'GB0000515477',
            'InstrumentName': 'Treasury Coupon Strip 07Dec2020',
            'CleanPrice': '91.888453000000',
            'DirtyPrice': '91.88845300000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '1.572243000000'
        },
        {
            'IsinCode': 'GB0000515816',
            'InstrumentName': '8% Treasury Principal Strip 07Jun2021',
            'CleanPrice': '90.642071000000',
            'DirtyPrice': '90.64207100000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '1.671769000000'
        },
        {
            'IsinCode': 'GB0000515923',
            'InstrumentName': 'Treasury Coupon Strip 07Jun2021',
            'CleanPrice': '90.642071000000',
            'DirtyPrice': '90.64207100000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '1.671769000000'
        },
        {
            'IsinCode': 'GB0002404191',
            'InstrumentName': '6% Treasury Stock 2028',
            'CleanPrice': '142.650000000000',
            'DirtyPrice': '143.24016393442623000000',
            'AccruedInterest': '0.590163934426',
            'Yield': '2.286776000000'
        },
        {
            'IsinCode': 'GB0002442514',
            'InstrumentName': 'Treasury Coupon Strip 07Dec2021',
            'CleanPrice': '89.363418000000',
            'DirtyPrice': '89.36341800000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '1.764456000000'
        },
        {
            'IsinCode': 'GB0002442621',
            'InstrumentName': 'Treasury Coupon Strip 07Jun2022',
            'CleanPrice': '88.076284000000',
            'DirtyPrice': '88.07628400000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '1.848150000000'
        },
        {
            'IsinCode': 'GB0002442738',
            'InstrumentName': 'Treasury Coupon Strip 07Dec2022',
            'CleanPrice': '86.774273000000',
            'DirtyPrice': '86.77427300000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '1.925815000000'
        },
        {
            'IsinCode': 'GB0002442845',
            'InstrumentName': 'Treasury Coupon Strip 07Jun2023',
            'CleanPrice': '85.477432000000',
            'DirtyPrice': '85.47743200000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '1.995781000000'
        },
        {
            'IsinCode': 'GB0002442951',
            'InstrumentName': 'Treasury Coupon Strip 07Dec2023',
            'CleanPrice': '84.175783000000',
            'DirtyPrice': '84.17578300000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.060895000000'
        },
        {
            'IsinCode': 'GB0002443033',
            'InstrumentName': 'Treasury Coupon Strip 07Jun2024',
            'CleanPrice': '82.879384000000',
            'DirtyPrice': '82.87938400000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.120707000000'
        },
        {
            'IsinCode': 'GB0002443140',
            'InstrumentName': 'Treasury Coupon Strip 07Dec2024',
            'CleanPrice': '81.590105000000',
            'DirtyPrice': '81.59010500000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.175865000000'
        },
        {
            'IsinCode': 'GB0002443256',
            'InstrumentName': 'Treasury Coupon Strip 07Jun2025',
            'CleanPrice': '80.315949000000',
            'DirtyPrice': '80.31594900000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.226092000000'
        },
        {
            'IsinCode': 'GB0002443363',
            'InstrumentName': 'Treasury Coupon Strip 07Dec2025',
            'CleanPrice': '79.043332000000',
            'DirtyPrice': '79.04333200000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.273760000000'
        },
        {
            'IsinCode': 'GB0002443470',
            'InstrumentName': 'Treasury Coupon Strip 07Jun2026',
            'CleanPrice': '77.786110000000',
            'DirtyPrice': '77.78611000000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.317633000000'
        },
        {
            'IsinCode': 'GB0002443587',
            'InstrumentName': 'Treasury Coupon Strip 07Dec2026',
            'CleanPrice': '76.530305000000',
            'DirtyPrice': '76.53030500000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.359821000000'
        },
        {
            'IsinCode': 'GB0002443694',
            'InstrumentName': 'Treasury Coupon Strip 07Jun2027',
            'CleanPrice': '75.289497000000',
            'DirtyPrice': '75.28949700000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.399068000000'
        },
        {
            'IsinCode': 'GB0002443702',
            'InstrumentName': 'Treasury Coupon Strip 07Dec2027',
            'CleanPrice': '74.049926000000',
            'DirtyPrice': '74.04992600000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.437238000000'
        },
        {
            'IsinCode': 'GB0002443819',
            'InstrumentName': 'Treasury Coupon Strip 07Jun2028',
            'CleanPrice': '72.818344000000',
            'DirtyPrice': '72.81834400000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.473794000000'
        },
        {
            'IsinCode': 'GB0002443926',
            'InstrumentName': 'Treasury Coupon Strip 07Dec2028',
            'CleanPrice': '71.594910000000',
            'DirtyPrice': '71.59491000000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.508930000000'
        },
        {
            'IsinCode': 'GB0002444007',
            'InstrumentName': '6% Treasury Principal Strip 07Dec2028',
            'CleanPrice': '71.594910000000',
            'DirtyPrice': '71.59491000000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.508930000000'
        },
        {
            'IsinCode': 'GB0004893086',
            'InstrumentName': '4¼% Treasury Stock 2032',
            'CleanPrice': '122.800000000000',
            'DirtyPrice': '123.21803278688525000000',
            'AccruedInterest': '0.418032786885',
            'Yield': '2.577253000000'
        },
        {
            'IsinCode': 'GB0008881541',
            'InstrumentName': '8% Treasury Stock 2015',
            'CleanPrice': '103.040000000000',
            'DirtyPrice': '103.82688524590164000000',
            'AccruedInterest': '0.786885245901',
            'Yield': '0.415218000000'
        },
        {
            'IsinCode': 'GB0008931148',
            'InstrumentName': '8¾% Treasury Stock 2017',
            'CleanPrice': '117.240000000000',
            'DirtyPrice': '120.57563535911602000000',
            'AccruedInterest': '3.335635359116',
            'Yield': '0.553662000000'
        },
        {
            'IsinCode': 'GB0009139048',
            'InstrumentName': '4¼% Treasury Principal Strip 07Jun2032',
            'CleanPrice': '63.359911000000',
            'DirtyPrice': '63.35991100000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.718275000000'
        },
        {
            'IsinCode': 'GB0009140046',
            'InstrumentName': 'Treasury Coupon Strip 07Jun2029',
            'CleanPrice': '70.386824000000',
            'DirtyPrice': '70.38682400000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.542082000000'
        },
        {
            'IsinCode': 'GB0009140269',
            'InstrumentName': 'Treasury Coupon Strip 07Dec2029',
            'CleanPrice': '69.181728000000',
            'DirtyPrice': '69.18172800000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.574706000000'
        },
        {
            'IsinCode': 'GB0009140483',
            'InstrumentName': 'Treasury Coupon Strip 07Jun2030',
            'CleanPrice': '67.993938000000',
            'DirtyPrice': '67.99393800000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.605478000000'
        },
        {
            'IsinCode': 'GB0009140939',
            'InstrumentName': 'Treasury Coupon Strip 07Dec2030',
            'CleanPrice': '66.811753000000',
            'DirtyPrice': '66.81175300000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.635711000000'
        },
        {
            'IsinCode': 'GB0009141010',
            'InstrumentName': 'Treasury Coupon Strip 07Jun2031',
            'CleanPrice': '65.649609000000',
            'DirtyPrice': '65.64960900000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.664098000000'
        },
        {
            'IsinCode': 'GB0009141671',
            'InstrumentName': 'Treasury Coupon Strip 07Dec2031',
            'CleanPrice': '64.496329000000',
            'DirtyPrice': '64.49632900000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.691845000000'
        },
        {
            'IsinCode': 'GB0009141895',
            'InstrumentName': 'Treasury Coupon Strip 07Jun2032',
            'CleanPrice': '63.359911000000',
            'DirtyPrice': '63.35991100000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.718275000000'
        },
        {
            'IsinCode': 'GB0009997999',
            'InstrumentName': '8% Treasury Stock 2021',
            'CleanPrice': '135.720000000000',
            'DirtyPrice': '136.50688524590164000000',
            'AccruedInterest': '0.786885245901',
            'Yield': '1.627158000000'
        },
        {
            'IsinCode': 'GB0030880693',
            'InstrumentName': '5% Treasury Stock 2025',
            'CleanPrice': '125.440000000000',
            'DirtyPrice': '127.17913043478261000000',
            'AccruedInterest': '1.739130434782',
            'Yield': '2.077330000000'
        },
        {
            'IsinCode': 'GB0030880701',
            'InstrumentName': '5% Treasury Principal Strip 07Mar2025',
            'CleanPrice': '80.958983000000',
            'DirtyPrice': '80.95898300000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.200410000000'
        },
        {
            'IsinCode': 'GB0030881998',
            'InstrumentName': 'Treasury Coupon Strip 07Sep2015',
            'CleanPrice': '99.944971000000',
            'DirtyPrice': '99.94497100000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '0.362046000000'
        },
        {
            'IsinCode': 'GB0030882186',
            'InstrumentName': 'Treasury Coupon Strip 07Mar2016',
            'CleanPrice': '99.735917000000',
            'DirtyPrice': '99.73591700000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '0.405874000000'
        },
        {
            'IsinCode': 'GB0030882293',
            'InstrumentName': 'Treasury Coupon Strip 07Sep2016',
            'CleanPrice': '99.414710000000',
            'DirtyPrice': '99.41471000000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '0.510129000000'
        },
        {
            'IsinCode': 'GB0030882418',
            'InstrumentName': 'Treasury Coupon Strip 07Mar2017',
            'CleanPrice': '98.970521000000',
            'DirtyPrice': '98.97052100000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '0.627317000000'
        },
        {
            'IsinCode': 'GB0030882855',
            'InstrumentName': 'Treasury Coupon Strip 07Sep2017',
            'CleanPrice': '98.383194000000',
            'DirtyPrice': '98.38319400000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '0.758818000000'
        },
        {
            'IsinCode': 'GB0030882962',
            'InstrumentName': 'Treasury Coupon Strip 07Mar2018',
            'CleanPrice': '97.673113000000',
            'DirtyPrice': '97.67311300000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '0.889693000000'
        },
        {
            'IsinCode': 'GB0030883150',
            'InstrumentName': 'Treasury Coupon Strip 07Sep2018',
            'CleanPrice': '96.824682000000',
            'DirtyPrice': '96.82468200000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '1.026307000000'
        },
        {
            'IsinCode': 'GB0030883267',
            'InstrumentName': 'Treasury Coupon Strip 07Mar2019',
            'CleanPrice': '95.878708000000',
            'DirtyPrice': '95.87870800000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '1.155688000000'
        },
        {
            'IsinCode': 'GB0030883481',
            'InstrumentName': 'Treasury Coupon Strip 07Sep2019',
            'CleanPrice': '94.820620000000',
            'DirtyPrice': '94.82062000000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '1.284964000000'
        },
        {
            'IsinCode': 'GB0030883598',
            'InstrumentName': 'Treasury Coupon Strip 07Mar2020',
            'CleanPrice': '93.696231000000',
            'DirtyPrice': '93.69623100000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '1.404517000000'
        },
        {
            'IsinCode': 'GB0030883606',
            'InstrumentName': 'Treasury Coupon Strip 07Sep2020',
            'CleanPrice': '92.498480000000',
            'DirtyPrice': '92.49848000000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '1.519238000000'
        },
        {
            'IsinCode': 'GB0030883713',
            'InstrumentName': 'Treasury Coupon Strip 07Mar2021',
            'CleanPrice': '91.275969000000',
            'DirtyPrice': '91.27596900000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '1.621539000000'
        },
        {
            'IsinCode': 'GB0030883937',
            'InstrumentName': 'Treasury Coupon Strip 07Sep2021',
            'CleanPrice': '90.001763000000',
            'DirtyPrice': '90.00176300000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '1.719606000000'
        },
        {
            'IsinCode': 'GB0030884125',
            'InstrumentName': 'Treasury Coupon Strip 07Mar2022',
            'CleanPrice': '88.728326000000',
            'DirtyPrice': '88.72832600000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '1.805877000000'
        },
        {
            'IsinCode': 'GB0030884232',
            'InstrumentName': 'Treasury Coupon Strip 07Sep2022',
            'CleanPrice': '87.422291000000',
            'DirtyPrice': '87.42229100000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '1.888285000000'
        },
        {
            'IsinCode': 'GB0030884349',
            'InstrumentName': 'Treasury Coupon Strip 07Mar2023',
            'CleanPrice': '86.132922000000',
            'DirtyPrice': '86.13292200000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '1.960343000000'
        },
        {
            'IsinCode': 'GB0030884455',
            'InstrumentName': 'Treasury Coupon Strip 07Sep2023',
            'CleanPrice': '84.822549000000',
            'DirtyPrice': '84.82254900000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.029428000000'
        },
        {
            'IsinCode': 'GB0030884562',
            'InstrumentName': 'Treasury Coupon Strip 07Mar2024',
            'CleanPrice': '83.530330000000',
            'DirtyPrice': '83.53033000000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.090797000000'
        },
        {
            'IsinCode': 'GB0030884679',
            'InstrumentName': 'Treasury Coupon Strip 07Sep2024',
            'CleanPrice': '82.230251000000',
            'DirtyPrice': '82.23025100000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.149175000000'
        },
        {
            'IsinCode': 'GB0030884786',
            'InstrumentName': 'Treasury Coupon Strip 07Mar2025',
            'CleanPrice': '80.958983000000',
            'DirtyPrice': '80.95898300000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.200410000000'
        },
        {
            'IsinCode': 'GB0030884893',
            'InstrumentName': 'Treasury Coupon Strip 07Sep2025',
            'CleanPrice': '79.675089000000',
            'DirtyPrice': '79.67508900000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.250644000000'
        },
        {
            'IsinCode': 'GB0032452392',
            'InstrumentName': '4¼% Treasury Stock 2036',
            'CleanPrice': '124.370000000000',
            'DirtyPrice': '125.84826086956522000000',
            'AccruedInterest': '1.478260869565',
            'Yield': '2.702292000000'
        },
        {
            'IsinCode': 'GB0032727876',
            'InstrumentName': '4¼% Treasury Principal Strip 07Mar2036',
            'CleanPrice': '55.526138000000',
            'DirtyPrice': '55.52613800000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.869074000000'
        },
        {
            'IsinCode': 'GB0032727983',
            'InstrumentName': 'Treasury Coupon Strip 07Mar2026',
            'CleanPrice': '78.420587000000',
            'DirtyPrice': '78.42058700000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.295079000000'
        },
        {
            'IsinCode': 'GB0032728064',
            'InstrumentName': 'Treasury Coupon Strip 07Sep2026',
            'CleanPrice': '77.153742000000',
            'DirtyPrice': '77.15374200000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.339311000000'
        },
        {
            'IsinCode': 'GB0032728171',
            'InstrumentName': 'Treasury Coupon Strip 07Mar2027',
            'CleanPrice': '75.915712000000',
            'DirtyPrice': '75.91571200000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.378800000000'
        },
        {
            'IsinCode': 'GB0032728288',
            'InstrumentName': 'Treasury Coupon Strip 07Sep2027',
            'CleanPrice': '74.665322000000',
            'DirtyPrice': '74.66532200000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.418641000000'
        },
        {
            'IsinCode': 'GB0032728395',
            'InstrumentName': 'Treasury Coupon Strip 07Mar2028',
            'CleanPrice': '73.436501000000',
            'DirtyPrice': '73.43650100000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.455233000000'
        },
        {
            'IsinCode': 'GB0032728403',
            'InstrumentName': 'Treasury Coupon Strip 07Sep2028',
            'CleanPrice': '72.202239000000',
            'DirtyPrice': '72.20223900000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.491785000000'
        },
        {
            'IsinCode': 'GB0032728510',
            'InstrumentName': 'Treasury Coupon Strip 07Mar2029',
            'CleanPrice': '70.996374000000',
            'DirtyPrice': '70.99637400000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.524866000000'
        },
        {
            'IsinCode': 'GB0032728627',
            'InstrumentName': 'Treasury Coupon Strip 07Sep2029',
            'CleanPrice': '69.779709000000',
            'DirtyPrice': '69.77970900000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.558786000000'
        },
        {
            'IsinCode': 'GB0032728734',
            'InstrumentName': 'Treasury Coupon Strip 07Mar2030',
            'CleanPrice': '68.592944000000',
            'DirtyPrice': '68.59294400000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.589484000000'
        },
        {
            'IsinCode': 'GB0032728841',
            'InstrumentName': 'Treasury Coupon Strip 07Sep2030',
            'CleanPrice': '67.398002000000',
            'DirtyPrice': '67.39800200000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.620974000000'
        },
        {
            'IsinCode': 'GB0032728957',
            'InstrumentName': 'Treasury Coupon Strip 07Mar2031',
            'CleanPrice': '66.235275000000',
            'DirtyPrice': '66.23527500000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.649342000000'
        },
        {
            'IsinCode': 'GB0032729039',
            'InstrumentName': 'Treasury Coupon Strip 07Sep2031',
            'CleanPrice': '65.067807000000',
            'DirtyPrice': '65.06780700000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.678348000000'
        },
        {
            'IsinCode': 'GB0032729146',
            'InstrumentName': 'Treasury Coupon Strip 07Mar2032',
            'CleanPrice': '63.929020000000',
            'DirtyPrice': '63.92902000000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.704844000000'
        },
        {
            'IsinCode': 'GB0032729252',
            'InstrumentName': 'Treasury Coupon Strip 07Sep2032',
            'CleanPrice': '62.795452000000',
            'DirtyPrice': '62.79545200000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.731183000000'
        },
        {
            'IsinCode': 'GB0032729369',
            'InstrumentName': 'Treasury Coupon Strip 07Mar2033',
            'CleanPrice': '61.699228000000',
            'DirtyPrice': '61.69922800000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.754428000000'
        },
        {
            'IsinCode': 'GB0032729476',
            'InstrumentName': 'Treasury Coupon Strip 07Sep2033',
            'CleanPrice': '60.605371000000',
            'DirtyPrice': '60.60537100000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.777940000000'
        },
        {
            'IsinCode': 'GB0032729583',
            'InstrumentName': 'Treasury Coupon Strip 07Mar2034',
            'CleanPrice': '59.550733000000',
            'DirtyPrice': '59.55073300000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.798384000000'
        },
        {
            'IsinCode': 'GB0032729690',
            'InstrumentName': 'Treasury Coupon Strip 07Sep2034',
            'CleanPrice': '58.501419000000',
            'DirtyPrice': '58.50141900000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.818942000000'
        },
        {
            'IsinCode': 'GB0032729708',
            'InstrumentName': 'Treasury Coupon Strip 07Mar2035',
            'CleanPrice': '57.492556000000',
            'DirtyPrice': '57.49255600000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.836483000000'
        },
        {
            'IsinCode': 'GB0032729815',
            'InstrumentName': 'Treasury Coupon Strip 07Sep2035',
            'CleanPrice': '56.491468000000',
            'DirtyPrice': '56.49146800000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.854013000000'
        },
        {
            'IsinCode': 'GB0032729922',
            'InstrumentName': 'Treasury Coupon Strip 07Mar2036',
            'CleanPrice': '55.526138000000',
            'DirtyPrice': '55.52613800000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.869074000000'
        },
        {
            'IsinCode': 'GB0033280339',
            'InstrumentName': '4¾% Treasury Stock 2015',
            'CleanPrice': '100.660000000000',
            'DirtyPrice': '102.31217391304348000000',
            'AccruedInterest': '1.652173913043',
            'Yield': '0.403810000000'
        },
        {
            'IsinCode': 'GB0033711341',
            'InstrumentName': '4¾% Treasury Principal Strip 07Sep2015',
            'CleanPrice': '99.944971000000',
            'DirtyPrice': '99.94497100000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '0.362046000000'
        },
        {
            'IsinCode': 'GB00B00NY175',
            'InstrumentName': '4¾% Treasury Stock 2038',
            'CleanPrice': '134.750000000000',
            'DirtyPrice': '135.21721311475410000000',
            'AccruedInterest': '0.467213114754',
            'Yield': '2.730522000000'
        },
        {
            'IsinCode': 'GB00B0125J88',
            'InstrumentName': '4¾% Treasury Principal Strip 07Dec2038',
            'CleanPrice': '50.652220000000',
            'DirtyPrice': '50.65222000000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.927802000000'
        },
        {
            'IsinCode': 'GB00B0125K93',
            'InstrumentName': 'Treasury Coupon Strip 07Dec2032',
            'CleanPrice': '62.241887000000',
            'DirtyPrice': '62.24188700000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.743342000000'
        },
        {
            'IsinCode': 'GB00B0125L01',
            'InstrumentName': 'Treasury Coupon Strip 07Jun2033',
            'CleanPrice': '61.149632000000',
            'DirtyPrice': '61.14963200000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.766452000000',
        },
        {
            'IsinCode': 'GB00B0125M18',
            'InstrumentName': 'Treasury Coupon Strip 07Dec2033',
            'CleanPrice': '60.072419000000',
            'DirtyPrice': '60.07241900000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.788687000000'
        },
        {
            'IsinCode': 'GB00B0125P49',
            'InstrumentName': 'Treasury Coupon Strip 07Jun2034',
            'CleanPrice': '59.023140000000',
            'DirtyPrice': '59.02314000000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.808933000000'
        },
        {
            'IsinCode': 'GB00B0126284',
            'InstrumentName': 'Treasury Coupon Strip 07Dec2034',
            'CleanPrice': '57.991256000000',
            'DirtyPrice': '57.99125600000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.828222000000'
        },
        {
            'IsinCode': 'GB00B0126K68',
            'InstrumentName': 'Treasury Coupon Strip 07Jun2035',
            'CleanPrice': '56.988884000000',
            'DirtyPrice': '56.98888400000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.845518000000'
        },
        {
            'IsinCode': 'GB00B0126S45',
            'InstrumentName': 'Treasury Coupon Strip 07Dec2036',
            'CleanPrice': '54.115330000000',
            'DirtyPrice': '54.11533000000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.889865000000'
        },
        {
            'IsinCode': 'GB00B0127928',
            'InstrumentName': 'Treasury Coupon Strip 07Dec2035',
            'CleanPrice': '56.005681000000',
            'DirtyPrice': '56.00568100000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.861803000000'
        },
        {
            'IsinCode': 'GB00B0127B43',
            'InstrumentName': 'Treasury Coupon Strip 07Jun2036',
            'CleanPrice': '55.047719000000',
            'DirtyPrice': '55.04771900000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.876581000000'
        },
        {
            'IsinCode': 'GB00B0127L41',
            'InstrumentName': 'Treasury Coupon Strip 07Jun2037',
            'CleanPrice': '53.213584000000',
            'DirtyPrice': '53.21358400000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.901249000000'
        },
        {
            'IsinCode': 'GB00B0127N64',
            'InstrumentName': 'Treasury Coupon Strip 07Dec2037',
            'CleanPrice': '52.332626000000',
            'DirtyPrice': '52.33262600000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.911628000000'
        },
        {
            'IsinCode': 'GB00B0127Q95',
            'InstrumentName': 'Treasury Coupon Strip 07Jun2038',
            'CleanPrice': '51.482014000000',
            'DirtyPrice': '51.48201400000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.920197000000'
        },
        {
            'IsinCode': 'GB00B0127W55',
            'InstrumentName': 'Treasury Coupon Strip 07Dec2038',
            'CleanPrice': '50.652220000000',
            'DirtyPrice': '50.65222000000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.927802000000'
        },
        {
            'IsinCode': 'GB00B058DQ55',
            'InstrumentName': '4¾% Treasury Stock 2020',
            'CleanPrice': '115.050000000000',
            'DirtyPrice': '116.70217391304348000000',
            'AccruedInterest': '1.652173913043',
            'Yield': '1.397018000000'
        },
        {
            'IsinCode': 'GB00B06YGN05',
            'InstrumentName': '4¼% Treasury Gilt 2055',
            'CleanPrice': '137.660000000000',
            'DirtyPrice': '138.07803278688525000000',
            'AccruedInterest': '0.418032786885',
            'Yield': '2.710361000000'
        },
        {
            'IsinCode': 'GB00B09JC451',
            'InstrumentName': '4¾% Treasury Principal Strip 07Mar2020',
            'CleanPrice': '93.696231000000',
            'DirtyPrice': '93.69623100000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '1.404517000000'
        },
        {
            'IsinCode': 'GB00B0BDSR09',
            'InstrumentName': 'Treasury Coupon Strip 07Jun2039',
            'CleanPrice': '49.852033000000',
            'DirtyPrice': '49.85203300000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.933707000000'
        },
        {
            'IsinCode': 'GB00B0BDSS16',
            'InstrumentName': 'Treasury Coupon Strip 07Dec2039',
            'CleanPrice': '49.072289000000',
            'DirtyPrice': '49.07228900000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.938708000000'
        },
        {
            'IsinCode': 'GB00B0BDST23',
            'InstrumentName': 'Treasury Coupon Strip 07Jun2040',
            'CleanPrice': '48.317001000000',
            'DirtyPrice': '48.31700100000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.942475000000'
        },
        {
            'IsinCode': 'GB00B0BDSV45',
            'InstrumentName': 'Treasury Coupon Strip 07Dec2040',
            'CleanPrice': '47.585642000000',
            'DirtyPrice': '47.58564200000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.945060000000'
        },
        {
            'IsinCode': 'GB00B0BDSW51',
            'InstrumentName': 'Treasury Coupon Strip 07Jun2041',
            'CleanPrice': '46.881428000000',
            'DirtyPrice': '46.88142800000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.946202000000'
        },
        {
            'IsinCode': 'GB00B0BDSX68',
            'InstrumentName': 'Treasury Coupon Strip 07Dec2041',
            'CleanPrice': '46.195975000000',
            'DirtyPrice': '46.19597500000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.946607000000'
        },
        {
            'IsinCode': 'GB00B0BDSY75',
            'InstrumentName': 'Treasury Coupon Strip 07Jun2042',
            'CleanPrice': '45.536085000000',
            'DirtyPrice': '45.53608500000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.945710000000'
        },
        {
            'IsinCode': 'GB00B0BDSZ82',
            'InstrumentName': 'Treasury Coupon Strip 07Dec2042',
            'CleanPrice': '44.893774000000',
            'DirtyPrice': '44.89377400000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.944172000000'
        },
        {
            'IsinCode': 'GB00B0BDT005',
            'InstrumentName': 'Treasury Coupon Strip 07Jun2043',
            'CleanPrice': '44.275294000000',
            'DirtyPrice': '44.27529400000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.941476000000'
        },
        {
            'IsinCode': 'GB00B0BDT112',
            'InstrumentName': 'Treasury Coupon Strip 07Dec2043',
            'CleanPrice': '43.673041000000',
            'DirtyPrice': '43.67304100000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.938245000000'
        },
        {
            'IsinCode': 'GB00B0BDT229',
            'InstrumentName': 'Treasury Coupon Strip 07Jun2044',
            'CleanPrice': '43.089632000000',
            'DirtyPrice': '43.08963200000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.934258000000'
        },
        {
            'IsinCode': 'GB00B0BDT336',
            'InstrumentName': 'Treasury Coupon Strip 07Dec2044',
            'CleanPrice': '42.524201000000',
            'DirtyPrice': '42.52420100000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.929579000000'
        },
        {
            'IsinCode': 'GB00B0BDT443',
            'InstrumentName': 'Treasury Coupon Strip 07Jun2045',
            'CleanPrice': '41.978809000000',
            'DirtyPrice': '41.97880900000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.924037000000'
        },
        {
            'IsinCode': 'GB00B0BDT559',
            'InstrumentName': 'Treasury Coupon Strip 07Dec2045',
            'CleanPrice': '41.446554000000',
            'DirtyPrice': '41.44655400000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.918183000000'
        },
        {
            'IsinCode': 'GB00B0BDT666',
            'InstrumentName': 'Treasury Coupon Strip 07Jun2046',
            'CleanPrice': '40.932339000000',
            'DirtyPrice': '40.93233900000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.911613000000'
        },
        {
            'IsinCode': 'GB00B0BDT773',
            'InstrumentName': 'Treasury Coupon Strip 07Dec2046',
            'CleanPrice': '40.429583000000',
            'DirtyPrice': '40.42958300000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.904846000000'
        },
        {
            'IsinCode': 'GB00B0BDT880',
            'InstrumentName': 'Treasury Coupon Strip 07Jun2047',
            'CleanPrice': '39.942848000000',
            'DirtyPrice': '39.94284800000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.897507000000'
        },
        {
            'IsinCode': 'GB00B0BDT997',
            'InstrumentName': 'Treasury Coupon Strip 07Dec2047',
            'CleanPrice': '39.465857000000',
            'DirtyPrice': '39.46585700000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.890088000000'
        },
        {
            'IsinCode': 'GB00B0BDTB14',
            'InstrumentName': 'Treasury Coupon Strip 07Jun2048',
            'CleanPrice': '39.000415000000',
            'DirtyPrice': '39.00041500000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.882431000000'
        },
        {
            'IsinCode': 'GB00B0BDTC21',
            'InstrumentName': 'Treasury Coupon Strip 07Dec2048',
            'CleanPrice': '38.545646000000',
            'DirtyPrice': '38.54564600000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.874595000000'
        },
        {
            'IsinCode': 'GB00B0BDTD38',
            'InstrumentName': 'Treasury Coupon Strip 07Jun2049',
            'CleanPrice': '38.103107000000',
            'DirtyPrice': '38.10310700000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.866447000000'
        },
        {
            'IsinCode': 'GB00B0BDTF51',
            'InstrumentName': 'Treasury Coupon Strip 07Dec2049',
            'CleanPrice': '37.667116000000',
            'DirtyPrice': '37.66711600000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.858420000000'
        },
        {
            'IsinCode': 'GB00B0BDTG68',
            'InstrumentName': 'Treasury Coupon Strip 07Jun2050',
            'CleanPrice': '37.241650000000',
            'DirtyPrice': '37.24165000000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.850193000000'
        },
        {
            'IsinCode': 'GB00B0BDTH75',
            'InstrumentName': 'Treasury Coupon Strip 07Dec2050',
            'CleanPrice': '36.821272000000',
            'DirtyPrice': '36.82127200000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.842176000000'
        },
        {
            'IsinCode': 'GB00B0BDTJ99',
            'InstrumentName': 'Treasury Coupon Strip 07Jun2051',
            'CleanPrice': '36.409867000000',
            'DirtyPrice': '36.40986700000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.834054000000'
        },
        {
            'IsinCode': 'GB00B0BDTK05',
            'InstrumentName': 'Treasury Coupon Strip 07Dec2051',
            'CleanPrice': '36.002237000000',
            'DirtyPrice': '36.00223700000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.826220000000'
        },
        {
            'IsinCode': 'GB00B0BDTL12',
            'InstrumentName': 'Treasury Coupon Strip 07Jun2052',
            'CleanPrice': '35.600024000000',
            'DirtyPrice': '35.60002400000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.818532000000'
        },
        {
            'IsinCode': 'GB00B0BDTM29',
            'InstrumentName': 'Treasury Coupon Strip 07Dec2052',
            'CleanPrice': '35.202629000000',
            'DirtyPrice': '35.20262900000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.811025000000'
        },
        {
            'IsinCode': 'GB00B0BDTN36',
            'InstrumentName': 'Treasury Coupon Strip 07Jun2053',
            'CleanPrice': '34.811631000000',
            'DirtyPrice': '34.81163100000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.803566000000'
        },
        {
            'IsinCode': 'GB00B0BDTP59',
            'InstrumentName': 'Treasury Coupon Strip 07Dec2053',
            'CleanPrice': '34.422223000000',
            'DirtyPrice': '34.42222300000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.796512000000'
        },
        {
            'IsinCode': 'GB00B0BDTQ66',
            'InstrumentName': 'Treasury Coupon Strip 07Jun2054',
            'CleanPrice': '34.038195000000',
            'DirtyPrice': '34.03819500000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.789562000000'
        },
        {
            'IsinCode': 'GB00B0BDTR73',
            'InstrumentName': 'Treasury Coupon Strip 07Dec2054',
            'CleanPrice': '33.654904000000',
            'DirtyPrice': '33.65490400000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.783059000000'
        },
        {
            'IsinCode': 'GB00B0BDTS80',
            'InstrumentName': 'Treasury Coupon Strip 07Jun2055',
            'CleanPrice': '33.276153000000',
            'DirtyPrice': '33.27615300000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.776703000000'
        },
        {
            'IsinCode': 'GB00B0BDTT97',
            'InstrumentName': 'Treasury Coupon Strip 07Dec2055',
            'CleanPrice': '32.897434000000',
            'DirtyPrice': '32.89743400000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.770826000000'
        },
        {
            'IsinCode': 'GB00B0BDTV10',
            'InstrumentName': '4¼% Treasury Principal Strip 07Dec2055',
            'CleanPrice': '32.897434000000',
            'DirtyPrice': '32.89743400000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.770826000000'
        },
        {
            'IsinCode': 'GB00B0V3WX43',
            'InstrumentName': '4% Treasury Gilt 2016',
            'CleanPrice': '104.020000000000',
            'DirtyPrice': '105.41130434782609000000',
            'AccruedInterest': '1.391304347826',
            'Yield': '0.496177000000'
        },
        {
            'IsinCode': 'GB00B128DP45',
            'InstrumentName': '4¼% Treasury Gilt 2046',
            'CleanPrice': '130.820000000000',
            'DirtyPrice': '131.23803278688525000000',
            'AccruedInterest': '0.418032786885',
            'Yield': '2.773390000000'
        },
        {
            'IsinCode': 'GB00B14XYM13',
            'InstrumentName': '4% Treasury Principal Strip 07Sep2016',
            'CleanPrice': '99.414710000000',
            'DirtyPrice': '99.41471000000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '0.510129000000'
        },
        {
            'IsinCode': 'GB00B15F3H46',
            'InstrumentName': '4¼% Treasury Principal Strip 07Dec2046',
            'CleanPrice': '40.429583000000',
            'DirtyPrice': '40.42958300000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.904846000000'
        },
        {
            'IsinCode': 'GB00B16NNR78',
            'InstrumentName': '4¼% Treasury Gilt 2027',
            'CleanPrice': '120.880000000000',
            'DirtyPrice': '121.29803278688525000000',
            'AccruedInterest': '0.418032786885',
            'Yield': '2.304520000000'
        },
        {
            'IsinCode': 'GB00B1HYR000',
            'InstrumentName': '4¼% Treasury Principal Strip 07Dec2027',
            'CleanPrice': '74.049926000000',
            'DirtyPrice': '74.04992600000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.437238000000'
        },
        {
            'IsinCode': 'GB00B1VWPC84',
            'InstrumentName': '5% Treasury Gilt 2018',
            'CleanPrice': '111.040000000000',
            'DirtyPrice': '112.77913043478261000000',
            'AccruedInterest': '1.739130434782',
            'Yield': '0.785314000000'
        },
        {
            'IsinCode': 'GB00B1VWPJ53',
            'InstrumentName': '4.5% Treasury Gilt 2042',
            'CleanPrice': '133.180000000000',
            'DirtyPrice': '133.62262295081967000000',
            'AccruedInterest': '0.442622950819',
            'Yield': '2.764950000000'
        },
        {
            'IsinCode': 'GB00B23K1Q33',
            'InstrumentName': '5% Treasury Principal Strip 07Mar2018',
            'CleanPrice': '97.673113000000',
            'DirtyPrice': '97.67311300000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '0.889693000000'
        },
        {
            'IsinCode': 'GB00B2494Q05',
            'InstrumentName': '4.5% Treasury Principal Strip 07Dec2042',
            'CleanPrice': '44.893774000000',
            'DirtyPrice': '44.89377400000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.944172000000'
        },
        {
            'IsinCode': 'GB00B24FF097',
            'InstrumentName': '4¾% Treasury Gilt 2030',
            'CleanPrice': '128.890000000000',
            'DirtyPrice': '129.35721311475410000000',
            'AccruedInterest': '0.467213114754',
            'Yield': '2.481363000000'
        },
        {
            'IsinCode': 'GB00B29WTS18',
            'InstrumentName': '4¾% Treasury Principal Strip 07Dec2030',
            'CleanPrice': '66.811753000000',
            'DirtyPrice': '66.81175300000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.635711000000'
        },
        {
            'IsinCode': 'GB00B39R3707',
            'InstrumentName': '4¼% Treasury Gilt 2049',
            'CleanPrice': '133.450000000000',
            'DirtyPrice': '133.86803278688525000000',
            'AccruedInterest': '0.418032786885',
            'Yield': '2.741776000000'
        },
        {
            'IsinCode': 'GB00B39R3F84',
            'InstrumentName': '4.5% Treasury Gilt 2019',
            'CleanPrice': '112.040000000000',
            'DirtyPrice': '113.60521739130435000000',
            'AccruedInterest': '1.565217391304',
            'Yield': '1.125475000000'
        },
        {
            'IsinCode': 'GB00B3FGZ752',
            'InstrumentName': '4.5% Treasury Principal Strip 07Mar2019',
            'CleanPrice': '95.878708000000',
            'DirtyPrice': '95.87870800000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '1.155688000000'
        },
        {
            'IsinCode': 'GB00B3FMYZ45',
            'InstrumentName': '4¼% Treasury Principal Strip 07Dec2049',
            'CleanPrice': '37.667116000000',
            'DirtyPrice': '37.66711600000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.858420000000'
        },
        {
            'IsinCode': 'GB00B3KJDQ49',
            'InstrumentName': '4% Treasury Gilt 2022',
            'CleanPrice': '114.140000000000',
            'DirtyPrice': '115.53130434782609000000',
            'AccruedInterest': '1.391304347826',
            'Yield': '1.739511000000'
        },
        {
            'IsinCode': 'GB00B3KJDS62',
            'InstrumentName': '4¼% Treasury Gilt 2039',
            'CleanPrice': '126.150000000000',
            'DirtyPrice': '127.62826086956522000000',
            'AccruedInterest': '1.478260869565',
            'Yield': '2.759356000000'
        },
        {
            'IsinCode': 'GB00B3QCG246',
            'InstrumentName': '2% Treasury Gilt 2016',
            'CleanPrice': '100.790000000000',
            'DirtyPrice': '101.74027624309392000000',
            'AccruedInterest': '0.950276243093',
            'Yield': '0.490945000000'
        },
        {
            'IsinCode': 'GB00B3V6KP22',
            'InstrumentName': '4% Treasury Principal Strip 07Mar2022',
            'CleanPrice': '88.728326000000',
            'DirtyPrice': '88.72832600000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '1.805877000000'
        },
        {
            'IsinCode': 'GB00B3W51667',
            'InstrumentName': '3¾% Treasury Principal Strip 07Sep2019',
            'CleanPrice': '94.820620000000',
            'DirtyPrice': '94.82062000000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '1.284964000000'
        },
        {
            'IsinCode': 'GB00B3X8RF54',
            'InstrumentName': '3¾% Treasury Principal Strip 07Sep2020',
            'CleanPrice': '92.498480000000',
            'DirtyPrice': '92.49848000000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '1.519238000000'
        },
        {
            'IsinCode': 'GB00B3Z3K594',
            'InstrumentName': '1¾% Treasury Gilt 2017',
            'CleanPrice': '101.790000000000',
            'DirtyPrice': '102.62149171270718000000',
            'AccruedInterest': '0.831491712707',
            'Yield': '0.569312000000'
        },
        {
            'IsinCode': 'GB00B458RZ05',
            'InstrumentName': '3¾% Treasury Principal Strip 07Sep2021',
            'CleanPrice': '90.001763000000',
            'DirtyPrice': '90.00176300000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '1.719606000000'
        },
        {
            'IsinCode': 'GB00B4JYZV64',
            'InstrumentName': '4.5% Treasury Principal Strip 2034',
            'CleanPrice': '58.501419000000',
            'DirtyPrice': '58.50141900000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.818942000000'
        },
        {
            'IsinCode': 'GB00B4RMG977',
            'InstrumentName': '3¾% Treasury Gilt 2021',
            'CleanPrice': '112.120000000000',
            'DirtyPrice': '113.42434782608696000000',
            'AccruedInterest': '1.304347826086',
            'Yield': '1.668633000000'
        },
        {
            'IsinCode': 'GB00B4YRFP41',
            'InstrumentName': '3¾% Treasury Gilt 2019',
            'CleanPrice': '109.940000000000',
            'DirtyPrice': '111.24434782608696000000',
            'AccruedInterest': '1.304347826086',
            'Yield': '1.283718000000'
        },
        {
            'IsinCode': 'GB00B52WS153',
            'InstrumentName': '4.5% Treasury Gilt 2034',
            'CleanPrice': '127.570000000000',
            'DirtyPrice': '129.13521739130435000000',
            'AccruedInterest': '1.565217391304',
            'Yield': '2.654191000000'
        },
        {
            'IsinCode': 'GB00B54QLM75',
            'InstrumentName': '4% Treasury Gilt 2060',
            'CleanPrice': '133.130000000000',
            'DirtyPrice': '135.03055248618785000000',
            'AccruedInterest': '1.900552486187',
            'Yield': '2.713543000000'
        },
        {
            'IsinCode': 'GB00B56HGD49',
            'InstrumentName': '4¼% Treasury Principal Strip 07Dec2040',
            'CleanPrice': '47.585642000000',
            'DirtyPrice': '47.58564200000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.945060000000'
        },
        {
            'IsinCode': 'GB00B582JV65',
            'InstrumentName': '3¾% Treasury Gilt 2020',
            'CleanPrice': '111.080000000000',
            'DirtyPrice': '112.38434782608696000000',
            'AccruedInterest': '1.304347826086',
            'Yield': '1.506523000000'
        },
        {
            'IsinCode': 'GB00B614YC20',
            'InstrumentName': 'Treasury Coupon Strip 07Sep2037',
            'CleanPrice': '52.767473000000',
            'DirtyPrice': '52.76747300000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.906756000000'
        },
        {
            'IsinCode': 'GB00B61BCQ39',
            'InstrumentName': 'Treasury Coupon Strip 07Sep2036',
            'CleanPrice': '54.575765000000',
            'DirtyPrice': '54.57576500000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.883559000000'
        },
        {
            'IsinCode': 'GB00B61HRJ92',
            'InstrumentName': 'Treasury Coupon Strip 07Mar2039',
            'CleanPrice': '50.253419000000',
            'DirtyPrice': '50.25341900000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.930473000000'
        },
        {
            'IsinCode': 'GB00B61LFT72',
            'InstrumentName': '4¼% Treasury Principal Strip 07Sep2039',
            'CleanPrice': '49.456944000000',
            'DirtyPrice': '49.45694400000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.936480000000'
        },
        {
            'IsinCode': 'GB00B61LFW02',
            'InstrumentName': 'Treasury Coupon Strip 07Sep2038',
            'CleanPrice': '51.061670000000',
            'DirtyPrice': '51.06167000000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.924296000000'
        },
        {
            'IsinCode': 'GB00B61NVB70',
            'InstrumentName': 'Treasury Coupon Strip 07Mar2038',
            'CleanPrice': '51.908820000000',
            'DirtyPrice': '51.90882000000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.915611000000'
        },
        {
            'IsinCode': 'GB00B61NVD94',
            'InstrumentName': 'Treasury Coupon Strip 07Sep2039',
            'CleanPrice': '49.456944000000',
            'DirtyPrice': '49.45694400000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.936480000000'
        },
        {
            'IsinCode': 'GB00B61NZ372',
            'InstrumentName': 'Treasury Coupon Strip 07Mar2037',
            'CleanPrice': '53.666221000000',
            'DirtyPrice': '53.66622100000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.895231000000'
        },
        {
            'IsinCode': 'GB00B6460505',
            'InstrumentName': '4¼% Treasury Gilt 2040',
            'CleanPrice': '126.890000000000',
            'DirtyPrice': '127.30803278688525000000',
            'AccruedInterest': '0.418032786885',
            'Yield': '2.768727000000'
        },
        {
            'IsinCode': 'GB00B6RNH572',
            'InstrumentName': '3¾% Treasury Gilt 2052',
            'CleanPrice': '123.100000000000',
            'DirtyPrice': '124.88176795580111000000',
            'AccruedInterest': '1.781767955801',
            'Yield': '2.751318000000'
        },
        {
            'IsinCode': 'GB00B79PS226',
            'InstrumentName': '1% Treasury Principal Strip 07Sep2017',
            'CleanPrice': '98.383194000000',
            'DirtyPrice': '98.38319400000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '0.758818000000'
        },
        {
            'IsinCode': 'GB00B7F9S958',
            'InstrumentName': '1% Treasury Gilt 2017',
            'CleanPrice': '100.560000000000',
            'DirtyPrice': '100.90782608695652000000',
            'AccruedInterest': '0.347826086956',
            'Yield': '0.737158000000'
        },
        {
            'IsinCode': 'GB00B7L9SL19',
            'InstrumentName': '1¾% Treasury Gilt 2022',
            'CleanPrice': '99.220000000000',
            'DirtyPrice': '99.82869565217391000000',
            'AccruedInterest': '0.608695652173',
            'Yield': '1.866879000000'
        },
        {
            'IsinCode': 'GB00B7Y41699',
            'InstrumentName': '1¾% Treasury Principal Strip 07Sep2022',
            'CleanPrice': '87.422291000000',
            'DirtyPrice': '87.42229100000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '1.888285000000'
        },
        {
            'IsinCode': 'GB00B7Z53659',
            'InstrumentName': '2¼% Treasury Gilt 2023',
            'CleanPrice': '101.940000000000',
            'DirtyPrice': '102.72260869565217000000',
            'AccruedInterest': '0.782608695652',
            'Yield': '1.990856000000'
        },
        {
            'IsinCode': 'GB00B84Z9V04',
            'InstrumentName': '3¼% Treasury Gilt 2044',
            'CleanPrice': '108.640000000000',
            'DirtyPrice': '110.18419889502762000000',
            'AccruedInterest': '1.544198895027',
            'Yield': '2.807751000000'
        },
        {
            'IsinCode': 'GB00B8KP6M44',
            'InstrumentName': '1¼% Treasury Gilt 2018',
            'CleanPrice': '100.690000000000',
            'DirtyPrice': '101.28392265193370000000',
            'AccruedInterest': '0.593922651933',
            'Yield': '1.017756000000'
        },
        {
            'IsinCode': 'GB00BBJNQY21',
            'InstrumentName': '3.5% Treasury Gilt 2068',
            'CleanPrice': '121.710000000000',
            'DirtyPrice': '123.37298342541436000000',
            'AccruedInterest': '1.662983425414',
            'Yield': '2.723730000000'
        },
        {
            'IsinCode': 'GB00BBR6CX43',
            'InstrumentName': '2¼% Treasury Principal Strip 07Sep2023',
            'CleanPrice': '84.822549000000',
            'DirtyPrice': '84.82254900000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.029428000000'
        },
        {
            'IsinCode': 'GB00BDV0F150',
            'InstrumentName': '1¾% Treasury Gilt 2019',
            'CleanPrice': '101.710000000000',
            'DirtyPrice': '102.54149171270718000000',
            'AccruedInterest': '0.831491712707',
            'Yield': '1.312394000000'
        },
        {
            'IsinCode': 'GB00BHBFH458',
            'InstrumentName': '2¾% Treasury Gilt 2024',
            'CleanPrice': '105.430000000000',
            'DirtyPrice': '106.38652173913044000000',
            'AccruedInterest': '0.956521739130',
            'Yield': '2.094735000000'
        },
        {
            'IsinCode': 'GB00BLSNW788',
            'InstrumentName': '2¾% Treasury Principal Strip 07Sept 2024',
            'CleanPrice': '82.230251000000',
            'DirtyPrice': '82.23025100000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.149175000000'
        },
        {
            'IsinCode': 'GB00BN65R198',
            'InstrumentName': '2% Treasury Gilt 2020',
            'CleanPrice': '102.200000000000',
            'DirtyPrice': '103.15027624309392000000',
            'AccruedInterest': '0.950276243093',
            'Yield': '1.543258000000'
        },
        {
            'IsinCode': 'GB00BN65R313',
            'InstrumentName': '3.5% Treasury Gilt 2045',
            'CleanPrice': '113.730000000000',
            'DirtyPrice': '115.39298342541436000000',
            'AccruedInterest': '1.662983425414',
            'Yield': '2.812371000000'
        },
        {
            'IsinCode': 'GB00BTHH2R79',
            'InstrumentName': '2% Treasury Gilt 2025',
            'CleanPrice': '98.170000000000',
            'DirtyPrice': '98.79500000000000000000',
            'AccruedInterest': '0.625000000000',
            'Yield': '2.202040000000'
        },
        {
            'IsinCode': 'GB00BWXBPL93',
            'InstrumentName': 'UK 2 Treasury Strip 07SEP2025P',
            'CleanPrice': '79.675089000000',
            'DirtyPrice': '79.67508900000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '2.250644000000'
        },
        {
            'IsinCode': 'GB00B0CNHZ09',
            'InstrumentName': '1¼% Index-linked Treasury Gilt 2055',
            'CleanPrice': '192.650000000000',
            'DirtyPrice': '259.03558226086957000000',
            'AccruedInterest': '0.237278260869',
            'Yield': '-0.722910000000'
        },
        {
            'IsinCode': 'GB00B0V3WQ75',
            'InstrumentName': '1¼% Index-linked Treasury Gilt 2017',
            'CleanPrice': '106.490000000000',
            'DirtyPrice': '142.16315171086957000000',
            'AccruedInterest': '0.235409510869',
            'Yield': '-1.444764000000'
        },
        {
            'IsinCode': 'GB00B128DH60',
            'InstrumentName': '1¼% Index-linked Treasury Gilt 2027',
            'CleanPrice': '125.350000000000',
            'DirtyPrice': '167.00565019565217000000',
            'AccruedInterest': '0.234996195652',
            'Yield': '-0.708983000000'
        },
        {
            'IsinCode': 'GB00B1L6W962',
            'InstrumentName': '1 1/8% Index-linked Treasury Gilt 2037',
            'CleanPrice': '143.860000000000',
            'DirtyPrice': '183.86181472010870000000',
            'AccruedInterest': '0.202945720108',
            'Yield': '-0.686569000000'
        },
        {
            'IsinCode': 'GB00B1Z5HQ14',
            'InstrumentName': '1 7/8% Index-linked Treasury Gilt 2022',
            'CleanPrice': '121.150000000000',
            'DirtyPrice': '152.43039351902174000000',
            'AccruedInterest': '0.332626019021',
            'Yield': '-0.898650000000'
        },
        {
            'IsinCode': 'GB00B24FFM16',
            'InstrumentName': '0¾% Index-linked Treasury Gilt 2047',
            'CleanPrice': '151.940000000000',
            'DirtyPrice': '188.94905764456522000000',
            'AccruedInterest': '0.131700244565',
            'Yield': '-0.681836000000'
        },
        {
            'IsinCode': 'GB00B3D4VD98',
            'InstrumentName': '1¼% Index-linked Treasury Gilt 2032',
            'CleanPrice': '136.150000000000',
            'DirtyPrice': '162.10735951630435000000',
            'AccruedInterest': '0.210033016304',
            'Yield': '-0.704168000000'
        },
        {
            'IsinCode': 'GB00B3LZBF68',
            'InstrumentName': '0 5/8% Index-linked Treasury Gilt 2040',
            'CleanPrice': '134.930000000000',
            'DirtyPrice': '161.12747966820652000000',
            'AccruedInterest': '0.228851868206',
            'Yield': '-0.672922000000'
        },
        {
            'IsinCode': 'GB00B3MYD345',
            'InstrumentName': '0 5/8% Index-linked Treasury Gilt 2042',
            'CleanPrice': '139.670000000000',
            'DirtyPrice': '169.83849740163044000000',
            'AccruedInterest': '0.107323301630',
            'Yield': '-0.689949000000'
        },
        {
            'IsinCode': 'GB00B3Y1JG82',
            'InstrumentName': '0 1/8% Index-linked Treasury Gilt 2029 ',
            'CleanPrice': '111.180000000000',
            'DirtyPrice': '120.94999167798913000000',
            'AccruedInterest': '0.041741677989',
            'Yield': '-0.654123000000'
        },
        {
            'IsinCode': 'GB00B421JZ66',
            'InstrumentName': '0.5% Index-linked Treasury Gilt 2050',
            'CleanPrice': '146.950000000000',
            'DirtyPrice': '177.98056410326087000000',
            'AccruedInterest': '0.185759103260',
            'Yield': '-0.694472000000'
        },
        {
            'IsinCode': 'GB00B46CGH68',
            'InstrumentName': '0¾% Index-linked Treasury Gilt 2034',
            'CleanPrice': '127.840000000000',
            'DirtyPrice': '142.38983903451087000000',
            'AccruedInterest': '0.256048634510',
            'Yield': '-0.648469000000'
        },
        {
            'IsinCode': 'GB00B4PTCY75',
            'InstrumentName': '0 3/8% Index-linked Treasury Gilt 2062',
            'CleanPrice': '163.430000000000',
            'DirtyPrice': '179.05413597948370000000',
            'AccruedInterest': '0.126069079483',
            'Yield': '-0.755390000000'
        },
        {
            'IsinCode': 'GB00B73ZYW09',
            'InstrumentName': '0¼% Index-linked Treasury Gilt 2052',
            'CleanPrice': '139.270000000000',
            'DirtyPrice': '148.64119561684783000000',
            'AccruedInterest': '0.081886616847',
            'Yield': '-0.688836000000'
        },
        {
            'IsinCode': 'GB00B7RN0G65',
            'InstrumentName': '0 1/8% Index-linked Treasury Gilt 2044',
            'CleanPrice': '124.720000000000',
            'DirtyPrice': '132.87516356005435000000',
            'AccruedInterest': '0.040880360054',
            'Yield': '-0.656524000000',
        },
        {
            'IsinCode': 'GB00B85SFQ54',
            'InstrumentName': '0 1/8% Index-linked Treasury Gilt 2024',
            'CleanPrice': '107.890000000000',
            'DirtyPrice': '114.95128304388587000000',
            'AccruedInterest': '0.040880743885',
            'Yield': '-0.751597000000'
        },
        {
            'IsinCode': 'GB00BBDR7T29',
            'InstrumentName': '0 1/8% Index-linked Treasury Gilt 2019',
            'CleanPrice': '106.200000000000',
            'DirtyPrice': '109.78338999184783000000',
            'AccruedInterest': '0.018255991847',
            'Yield': '-1.254437000000'
        },
        {
            'IsinCode': 'GB00BDX8CX86',
            'InstrumentName': '0 1/8% Index-linked Treasury Gilt 2068',
            'CleanPrice': '159.190000000000',
            'DirtyPrice': '164.64533274701087000000',
            'AccruedInterest': '0.039688947010',
            'Yield': '-0.780847000000'
        },
        {
            'IsinCode': 'GB00BP9DLZ64',
            'InstrumentName': '0 1/8% Index-linked Treasury Gilt 2058',
            'CleanPrice': '142.010000000000',
            'DirtyPrice': '143.32823908437500000000',
            'AccruedInterest': '0.038728984375',
            'Yield': '-0.714748000000'
        },
        {
            'IsinCode': 'GB00BYMWG366',
            'InstrumentName': '0 1/8% Index-linked Treasury Gilt 2046',
            'CleanPrice': '126.040000000000',
            'DirtyPrice': '126.24434673682065000000',
            'AccruedInterest': '0.006463936820',
            'Yield': '-0.641289000000'
        },
        {
            'IsinCode': 'GB00BYY5F144',
            'InstrumentName': '0 1/8% Index-linked Treasury Gilt 2026',
            'CleanPrice': '108.820000000000',
            'DirtyPrice': '108.82000000000000000000',
            'AccruedInterest': '0.000000000000',
            'Yield': '-0.669902000000'
        },
        {
            'IsinCode': 'GB0008932666',
            'InstrumentName': '4 1/8% Index-linked Treasury Stock 2030',
            'CleanPrice': '330.150000000000',
            'DirtyPrice': '333.87983425414365000000',
            'AccruedInterest': '3.729834254143',
            'Yield': '-0.638602000000'
        },
        {
            'IsinCode': 'GB0008983024',
            'InstrumentName': '2.5% Index-linked Treasury Stock 2024',
            'CleanPrice': '339.040000000000',
            'DirtyPrice': '338.96728397790055000000',
            'AccruedInterest': '-0.072716022099',
            'Yield': '-0.721312000000'
        },
        {
            'IsinCode': 'GB0009075325',
            'InstrumentName': '2.5% Index-linked Treasury Stock 2016',
            'CleanPrice': '324.360000000000',
            'DirtyPrice': '328.01451049723757000000',
            'AccruedInterest': '3.654510497237',
            'Yield': '-1.371607000000'
        },
        {
            'IsinCode': 'GB0009081828',
            'InstrumentName': '2.5% Index-linked Treasury Stock 2020',
            'CleanPrice': '360.710000000000',
            'DirtyPrice': '362.56978142076503000000',
            'AccruedInterest': '1.859781420765',
            'Yield': '-1.079487000000'
        },
        {
            'IsinCode': 'GB0031790826',
            'InstrumentName': '2% Index-linked Treasury Stock 2035',
            'CleanPrice': '228.010000000000',
            'DirtyPrice': '229.38462148066298000000',
            'AccruedInterest': '1.374621480662',
            'Yield': '-0.660259000000'
        }
    ];
}