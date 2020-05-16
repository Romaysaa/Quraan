import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-holy-quran',
  templateUrl: './holy-quran.component.html',
  styleUrls: ['./holy-quran.component.scss']
})
export class HolyQuranComponent implements OnInit {
  @Input() allMotashabehat: any[];
  a=[];
  childs=[];

  constructor() { }

  ngOnInit() {
    debugger;
    // this.allMotashabehat.forEach(arr=>{
    //   console.log('allMotashabehat: '+arr);
    // });


    this.allMotashabehat.forEach(mot=>{
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
              this.childs.push({ayaNum:mot[mot.length-1].ayaNum,sura:modeh.suraWithIndex,char:word.nOfChar*10,word:word.word});

          });
        }
        // break;
        // this.childs.push({sura:mot[mot.length-1].motashabeh[0].sura,char:word.nOfChar*10,word:word.word});

      } else if(word.motashabeh.length>1){
        word.motashabeh.forEach(modeh=>{
          if(modeh.index != word.ayaNum){
            this.childs.push({ayaNum:mot[mot.length-1].ayaNum,sura:modeh.suraWithIndex,char:word.nOfChar*10,word:word.word});
          }


        });// break;
      }
      }
      });
    });
    console.log(this.a);
    console.log(this.childs);
    // console.log(this.a.length);

  }
inputs = [{start:'50',end:'130',top: '150px',href:'#17',activeAya:'17',spans:[{top:'50px',left: '45px',width: '392px',height: '35px'},{top:'90px',left: '100px',width: '337px',height: '35px'}]},
          {start:'130',end:'170',top: '550px',href:'#18',activeAya:'18',spans:[{top:'90px',left: '45px',width: '40px',height: '35px'},{top:'130px',left: '265px',width: '172px',height: '35px'}]},
          {start:'130',end:'170',top: '550px',href:'#18',activeAya:'18',spans:[{top:'90px',left: '45px',width: '40px',height: '35px'},{top:'130px',left: '265px',width: '172px',height: '35px'}]},
          ];

}
