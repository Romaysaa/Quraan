import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-holy-quran',
  templateUrl: './holy-quran.component.html',
  styleUrls: ['./holy-quran.component.scss']
})
export class HolyQuranComponent implements OnInit {
  margineTop: number = 50;
  @Input() allMotashabehat: any[];
  a=[];
  childs=[];
  inputs: ({ spans: ({ top: string; left: string; width: string; height: string })[]; top: string; start: string; end: string; href: string; activeAya: string })[] = [];
  isShiftedVertically: boolean = false;

  constructor() { }

  ngOnInit() {
    debugger;
    // this.allMotashabehat.forEach(arr=>{
    //   console.log('allMotashabehat: '+arr);
    // });

    let ayasLines = [];
    this.allMotashabehat.forEach(mot=>{
      let numOfAyaChars = mot[mot.length - 1].numOfCharsInWholeAya;
      // let ayaIndex = mot[mot.length-1].motashabeh[mot[mot.length-1].motashabeh.length-1].arrOfWords[0].index;
      console.log('numOfAyaChars: ' + numOfAyaChars);
      // console.log('ayaIndex: ' + ayaIndex);

      let isFirst = true;
      let temp = [];
      while (numOfAyaChars >= 0) {
        debugger;
        if (isFirst) {
          temp = [];
          if (numOfAyaChars >= 78 && ayasLines[ayasLines.length - 1] == 78) {
            ayasLines = []
          } else if (ayasLines[ayasLines.length - 1] < 78) {//if(ayasLines[ayasLines.length-1]<78)
            debugger;
            temp = ayasLines;
            ayasLines = [];
            numOfAyaChars = numOfAyaChars - (78-temp[temp.length-1]);
            ayasLines.push(78 - temp[temp.length - 1]);
            this.margineTop -= 43.75;
          }
        }
        if (numOfAyaChars >= 0) {
          if (numOfAyaChars >= 78) {
            ayasLines.push(78);
            numOfAyaChars = numOfAyaChars - 78;
          } else {
            if (temp.length > 0) {
              // numOfAyaChars=  numOfAyaChars - (78 - temp[temp.length - 1]);
              ayasLines.push(numOfAyaChars);
              if(numOfAyaChars<78){break}

            } else {
              ayasLines.push(numOfAyaChars);
              numOfAyaChars = numOfAyaChars - 78;
            }

          }

        } else {
          break;
        }

        isFirst = false;
      }
      console.log('ayasLines: ' + ayasLines);
      let spans = [];
      debugger;
      for (let i = 0; i < ayasLines.length; i++) {
        spans.push({
          top: this.margineTop + 'px',
          left: temp.length != 0 ? i == 0 ? 45  + 'px' : 45 + (78 - ayasLines[i]) * 5 + 'px' : 45 + (78 - ayasLines[i]) * 5 + 'px',
          width: ayasLines[i] * 5 + 'px',
          height: '35px'
        });
        if (i == ayasLines.length - 1 || i == 0 || ayasLines[i] == 78)
          this.margineTop += 43.75;
        this.isShiftedVertically = i == ayasLines.length - 1;
      }

      this.inputs.push({start: '50', end: '130', top: '150px', href: '#17', activeAya: '17', spans: spans});
      // console.log(this.a.length);
      // this.inputs = [{start:'50',end:'130',top: '150px',href:'#17',activeAya:'17',spans:[{top:'50px',left: '45px',width:this.t.length*5+'px',height: '35px'},{top:'90px',left: '100px',width: 67*5+'px',height: '35px'}]},
      //   {start:'130',end:'170',top: '550px',href:'#18',activeAya:'18',spans:[{top:'90px',left: '45px',width: '40px',height: '35px'},{top:'130px',left: '265px',width: '172px',height: '35px'}]},
      //   {start:'130',end:'170',top: '550px',href:'#18',activeAya:'18',spans:[{top:'90px',left: '45px',width: '40px',height: '35px'},{top:'130px',left: '265px',width: '172px',height: '35px'}]},
      // ];
      //
      this.a.push(mot[mot.length-1].motashabeh[mot[mot.length-1].motashabeh.length-1].arrOfWords);
      mot[mot.length-1].motashabeh[mot[mot.length-1].motashabeh.length-1].arrOfWords.forEach(word=>{
      if(word.motashabeh.length>0&&word.motashabeh.length<15){
      if(word.motashabeh.length>7){
        let suras=[];
        word.motashabeh.forEach(modeh=>{
          if(suras.indexOf(modeh.sura)<0){
            suras.push(modeh.sura);
          }
        });
        if(suras.length<=6){
          word.motashabeh.forEach(modeh=>{
            this.childs.push({
              ayaNum: mot[0].ayaNum,
              sura: modeh.suraWithIndex,
              char: word.nOfChar * 10,
              word: word.word
            });

          });
        }
        // break;
        // this.childs.push({sura:mot[mot.length-1].motashabeh[0].sura,char:word.nOfChar*10,word:word.word});

      } else if(word.motashabeh.length>1){
        word.motashabeh.forEach(modeh=>{
          if(modeh.index != word.ayaNum){
            this.childs.push({
              ayaNum: mot[0].ayaNum,
              sura: modeh.suraWithIndex,
              char: word.nOfChar * 10,
              word: word.word
            });
          }


        });// break;
      }
      }
      });
    });
    console.log(this.a);
    console.log(this.childs);
    
    // console.log(this.a.length);
    // this.inputs = [{start:'50',end:'130',top: '150px',href:'#17',activeAya:'17',spans:[{top:'50px',left: '45px',width:this.t.length*5+'px',height: '35px'},{top:'90px',left: '100px',width: 67*5+'px',height: '35px'}]},
    //   {start:'130',end:'170',top: '550px',href:'#18',activeAya:'18',spans:[{top:'90px',left: '45px',width: '40px',height: '35px'},{top:'130px',left: '265px',width: '172px',height: '35px'}]},
    //   {start:'130',end:'170',top: '550px',href:'#18',activeAya:'18',spans:[{top:'90px',left: '45px',width: '40px',height: '35px'},{top:'130px',left: '265px',width: '172px',height: '35px'}]},
    // ];
  }


}
