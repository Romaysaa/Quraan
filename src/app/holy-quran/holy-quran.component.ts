import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {QuranPages} from "./QuranPages";
import {QuranInJson} from "./QuranInJson";


@Component({
  selector: 'app-holy-quran',
  templateUrl: './holy-quran.component.html',
  styleUrls: ['./holy-quran.component.scss']
})
export class HolyQuranComponent implements OnInit {

  @Input() pageNumber: number;
  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() motahabehClick: EventEmitter<any> = new EventEmitter<any>();


  marginTop: number = 50;
  inputs: ({
    motashabehat: { isRight: boolean; moade3: any[], height: string, top: string };
    ayat:any[];
    aya: string,
    ayaId: string,
    spans: ({ aya: string, top: string; left: string; width: string; height: string })[];
    motashabehatSpans: { isRight: boolean; moade3: string, height: string, top: string }[];
    spansOfColoredWords: { top: string; left: string; width: string; color: string }[];
    isActive: boolean; href: string; activeAya: string
  })[] = [];
  isShiftedVertically: boolean = false;
  quranPageImage: String;
  arrOfAyaWords: string[];
  motashabehatSpans: { isRight: boolean; top: string, moade3: string, height: string }[] = [];
  lastTopRight: number = 0;
  lastTopLeft: number = 0;
  spansOfColoredWords: { top: string; left: string; width: string; color: string }[];
  suras: string[] = ["البقرة", "آل عمران", "النساء", "المائدة"];
  private searchWord: string;
  private x: {
    suraWithIndex: string,
    errorFactor: string,
    id: string,
    text: string,
    index: string,
    sura: string,
    lastWord?: String,
  }[] = [];
  private allAyas: {
    errorFactor: string,
    id: string,
    aya: string,
    numOfCharsInWholeAya: number,
    ayaIndex: string,
    arrOfColoredWords: {
      word: string,
      color: string,
      lineIndex?:number,
      left?:string
    }[],
    sura: string,
    suraWithIndex: string,
    mooade3: {
      suraWithIndex: string,
      aya?: string,
      id: string,
    }[]
  }[] = [];

  constructor(private _quranPages: QuranPages, private _quranInJson: QuranInJson,) {
  }

  findSuras(sura) {
    // debugger
    let index = this.suras.indexOf(sura);
    return index >= 0;
  }

  ngOnInit() {
    // debugger;
    this.quranPageImage = "assets/" + this.pageNumber + ".png";

    this.generateMotashabehatOfSelectedPage(this.pageNumber);
    console.log(this.allAyas);

    this.determineHighlight();

    this.drawColoredWords();
  }

  onAyaClick($event: any) {
    // inp.isActive = true
    this.onClick.emit($event)
  }
  onMotahabehClick($event: any) {
    // inp.isActive = true
    // debugger
    this.motahabehClick.emit($event)
  }

  addStaticMotashabehat(ayaInPage: { index: string; id: string; customMotashabehat: { motshabeh: string, id: string, color: string, word: string,lineIndex: string ,left?: string,aya: string }[]; errorFactor: string; text: string }, ayaDetails: { aya: string; errorFactor: string; id: string; numOfCharsInWholeAya: number; ayaIndex: string; arrOfColoredWords: any[]; sura: string; suraWithIndex: string; mooade3: { suraWithIndex: string; aya?: string, id: string }[] }) {

    if (ayaInPage.customMotashabehat.length > 0) {
      ayaInPage.customMotashabehat.forEach(mot => {
        ayaDetails.mooade3.push({
          aya: mot.aya,
          id: mot.id,
          suraWithIndex: mot.motshabeh,
        });
        if (mot.color != '' && mot.color != null) {
          ayaDetails.arrOfColoredWords.push(
            {word: mot.word, color: mot.color,lineIndex:mot.lineIndex,
              left:mot.left}
          );
        }

      });

    }
    return ayaDetails;
  }

  private generateMotashabehatOfSelectedPage(pageNumber) {
    this._quranPages.pages[pageNumber - 1].ayas.forEach(ayaInPage => {
      this.arrOfAyaWords = ayaInPage.text.split(' ');
      this.searchWord = this.arrOfAyaWords[0];
      let isCheckIn = false;
      let ayaDetails: {
        aya: string,
        errorFactor: string,
        id: string,
        numOfCharsInWholeAya: number,
        ayaIndex: string,
        arrOfColoredWords: any[],
        sura: string,
        suraWithIndex: string,
        mooade3: {
          suraWithIndex: string,
          aya?: string,
          id: string,
        }[]
      } = {
        arrOfColoredWords: [], errorFactor: '', id: '', mooade3: [], suraWithIndex: '', sura: '',
        aya: '', ayaIndex: '', numOfCharsInWholeAya: 0
      };
      let arrayOfMot = [];
      let arrayOfWordsWithColors = [];
      for (let i = 0; i <= this.arrOfAyaWords.length; i++) {
        this.x = [];
        let countSuras = [];

        if (i == 0) {
          this.searchWord = this.arrOfAyaWords[0];
        } else {
          this.searchWord = this.searchWord + ' ' + this.arrOfAyaWords[i];
        }
        this._quranInJson.suras.forEach(sura => {
          // if(this.findSuras(sura.name)){
          sura.aya.forEach(aya => {
            if (aya.text.startsWith(this.searchWord)) {
              this.x.push({
                id: ayaInPage.id,
                errorFactor: ayaInPage.errorFactor,
                text: aya.text,
                index: aya.index,
                suraWithIndex: sura.name + ' (' + aya.index + ') ',
                sura: sura.name,
                lastWord: this.searchWord
              });
              if (countSuras.indexOf(sura.name) < 0) {//to calculate number of suras for motashabeh
                countSuras.push(sura.name);
              }
            }
            // }
          });
          // }
        });

        if (this.x.length == 1) {
          arrayOfWordsWithColors.push({word: this.x[0].lastWord, color: "red",});
          if (!isCheckIn) {
            ayaDetails =
              {
                errorFactor: this.x[0].errorFactor,
                id: this.x[0].id,
                aya: this.x[0].text,
                numOfCharsInWholeAya: this.x[0].text.length,
                ayaIndex: this.x[0].index,
                arrOfColoredWords: arrayOfWordsWithColors,
                sura: this.x[0].sura,
                suraWithIndex: this.x[0].suraWithIndex,
                mooade3: arrayOfMot
              };
            isCheckIn = true;
          } else {
            ayaDetails.arrOfColoredWords = arrayOfWordsWithColors;
          }

          break;
        } else if (this.x.length == 2) {
          arrayOfWordsWithColors.push({word: this.x[0].lastWord, color: "green",});

          if (!isCheckIn) {
            this.x.forEach(mode3 => {
              arrayOfMot.push({
                id: mode3.id,
                suraWithIndex: mode3.suraWithIndex,
                aya: mode3.text,
              })
            });
            ayaDetails = {
              errorFactor: this.x[0].errorFactor,
              id: this.x[0].id,
              aya: this.x[0].text,
              numOfCharsInWholeAya: this.x[0].text.length,
              ayaIndex: this.x[0].index,
              sura: this.x[0].sura,
              suraWithIndex: this.x[0].suraWithIndex,
              arrOfColoredWords: arrayOfWordsWithColors,
              mooade3: arrayOfMot
            };
            isCheckIn = true;
          } else {
            ayaDetails.arrOfColoredWords = arrayOfWordsWithColors;
          }

        } else if (this.x.length == 3) {
          arrayOfWordsWithColors.push({word: this.x[0].lastWord, color: "blue",});

          if (!isCheckIn) {
            this.x.forEach(mode3 => {
              arrayOfMot.push({
                id: mode3.id,
                suraWithIndex: mode3.suraWithIndex,
                aya: mode3.text,
              })
            });
            ayaDetails = {
              errorFactor: this.x[0].errorFactor,
              id: this.x[0].id,
              aya: this.x[0].text,
              numOfCharsInWholeAya: this.x[0].text.length,
              ayaIndex: this.x[0].index,
              sura: this.x[0].sura,
              suraWithIndex: this.x[0].suraWithIndex,
              arrOfColoredWords: arrayOfWordsWithColors,
              mooade3: arrayOfMot
            };
            isCheckIn = true;
          } else {
            ayaDetails.arrOfColoredWords = arrayOfWordsWithColors;
          }

        } else if (this.x.length == 4) {
          arrayOfWordsWithColors.push({word: this.x[0].lastWord, color: "yellow",});

          if (!isCheckIn) {
            this.x.forEach(mode3 => {
              arrayOfMot.push({
                id: mode3.id,
                suraWithIndex: mode3.suraWithIndex,
                aya: mode3.text,
              })
            });
            ayaDetails = {
              errorFactor: this.x[0].errorFactor,
              id: this.x[0].id,
              aya: this.x[0].text,
              numOfCharsInWholeAya: this.x[0].text.length,
              ayaIndex: this.x[0].index,
              sura: this.x[0].sura,
              suraWithIndex: this.x[0].suraWithIndex,
              arrOfColoredWords: arrayOfWordsWithColors,
              mooade3: arrayOfMot
            };
            isCheckIn = true;
          } else {
            ayaDetails.arrOfColoredWords = arrayOfWordsWithColors;
          }

        } else if (this.x.length > 4) {
          arrayOfWordsWithColors.push({word: this.x[0].lastWord, color: "purple",});
          if (countSuras.length <= 6 || this.x.length <= 7) {
            if (!isCheckIn) {
              this.x.forEach(mode3 => {
                arrayOfMot.push({
                  id: mode3.id,
                  suraWithIndex: mode3.suraWithIndex,
                  aya: mode3.text,
                })
              });
              ayaDetails = {
                errorFactor: this.x[0].errorFactor,
                id: this.x[0].id,
                aya: this.x[0].text,
                numOfCharsInWholeAya: this.x[0].text.length,
                ayaIndex: this.x[0].index,
                sura: this.x[0].sura,
                suraWithIndex: this.x[0].suraWithIndex,
                arrOfColoredWords: arrayOfWordsWithColors,
                mooade3: arrayOfMot
              };
              isCheckIn = true;
            } else {
              ayaDetails.arrOfColoredWords = arrayOfWordsWithColors;
            }

          } else {
            ayaDetails.arrOfColoredWords = arrayOfWordsWithColors;
          }
        }
      }
      ayaDetails = this.addStaticMotashabehat(ayaInPage, ayaDetails);
      this.allAyas.push(ayaDetails);
    });
  }

  private determineHighlight() {
    let ayasLines = [];
    this.allAyas.forEach(aya => {
      if (parseInt(aya.ayaIndex) == 1) this.marginTop = 95;
      let ayaStart = this.marginTop;
      let ayaEnd;

      let numOfAyaChars = aya.numOfCharsInWholeAya;
      if (aya.errorFactor != "") {
        let operation = aya.errorFactor.split(" ")[0];
        let factor = aya.errorFactor.split(" ")[1];
        if (operation == '+') {
          numOfAyaChars = numOfAyaChars + parseInt(factor);
        } else {
          numOfAyaChars = numOfAyaChars - parseInt(factor);
        }

      }


      // console.log('numOfAyaChars: ' + numOfAyaChars);
      let isFirst = true;
      let temp = [];
      while (numOfAyaChars >= 0) {
        if (isFirst) {
          temp = [];
          if (numOfAyaChars >= 78 && ayasLines[ayasLines.length - 1] == 78) {
            ayasLines = []
          } else if (ayasLines[ayasLines.length - 1] < 78) {//if(ayasLines[ayasLines.length-1]<78)
            temp = ayasLines;
            ayasLines = [];
            numOfAyaChars = numOfAyaChars - (78 - temp[temp.length - 1]);
            ayasLines.push(78 - temp[temp.length - 1]);
            this.marginTop -= 43.75;
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
              if (numOfAyaChars < 78) {
                break
              }

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
      // console.log('ayasLines: ' + ayasLines);
      let spans = [];
      for (let i = 0; i < ayasLines.length; i++) {
        let ayaText = '';
        spans.push({
          aya: aya.aya,
          top: this.marginTop + 'px',
          left: temp.length != 0 ? i == 0 ? 60 + 'px' : 60 + (78 - ayasLines[i]) * 5 + 'px' : 60 + (78 - ayasLines[i]) * 5 + 'px',
          width: ayasLines[i] * 5 + 'px',
          height: '35px'
        });
        if (i == ayasLines.length - 1 || i == 0 || ayasLines[i] == 78)
          this.marginTop += 43.75;
        this.isShiftedVertically = i == ayasLines.length - 1;
      }
      ayaEnd = this.marginTop;
      this.motashabehatSpans = [];
      this.inputs.push({
        motashabehat:{top:'',height:'',isRight:true,moade3:[]},
        ayat:[],
        aya: aya.aya,
        ayaId: aya.id,
        isActive: false,
        href: '#' + aya.ayaIndex,
        activeAya: aya.ayaIndex,
        spans: spans,
        motashabehatSpans: [],
        spansOfColoredWords: []
      });
      this.drawMotashabehat(aya, ayaStart, ayaEnd);

    });
  }

  private drawMotashabehat(aya: {
    errorFactor: string,
    id: string,
    aya: string,
    numOfCharsInWholeAya: number,
    ayaIndex: string,
    arrOfColoredWords: any[],
    sura: string,
    suraWithIndex: string,
    mooade3: {
      suraWithIndex: string,
      aya?: string,
      id: string,
    }[]
  }, ayaStart: number, ayaEnd: number) {
    let height = ayaEnd - ayaStart;
    let index = this.allAyas.indexOf(aya);
    if (aya.mooade3.length > 0) {
      this.lastTopLeft = 0;
      let leftStartindex = this.fillRightArrayFirst(index, aya.mooade3, ayaStart, ayaEnd);
       this.addMoade3(index, aya.mooade3, ayaStart, ayaEnd);
      if (this.allAyas[index].mooade3.length > 0) {
        let ayat = [];
        this.allAyas[index].mooade3.forEach(m => {
          ayat.push(m.aya);
        });
        this.inputs[index].ayat = ayat;
      }
    }

  }

  private drawColoredWords() {
    for (let j = 0; j < this.allAyas.length; j++) {
      debugger
      this.spansOfColoredWords = [];
      let lastWord = '';
      let isMoveToNextLine = false;
      let lineIndex = 0;
      let previousColor;
      let space = 0;
      let left = parseInt(this.inputs[j].spans[lineIndex].left) + parseInt(this.inputs[j].spans[lineIndex].width);
      let top = this.inputs[j].spans[lineIndex].top.split("px")[0];
      for (let i = 0; i < this.allAyas[j].arrOfColoredWords.length; i++) {
        let width = 0;
        if (previousColor == this.allAyas[j].arrOfColoredWords[i].color) {
          space = 0;
        } else {
          space = 2;
        }

        if (i == 0) {
          width = this.allAyas[j].arrOfColoredWords[i].word.length * 5;
          left = left - width;
          this.spansOfColoredWords.push({
            top: parseInt(top) + 35 + "px",
            color: this.allAyas[j].arrOfColoredWords[i].color,
            width: width + 'px',
            left: left + 'px'
          });
          lastWord = this.allAyas[j].arrOfColoredWords[0].word;

        } else {
          // debugger;
          let currentWord = '';
          currentWord = this.allAyas[j].arrOfColoredWords[i].word.split(lastWord)[1];
          if(currentWord != undefined){
            width = currentWord.length * 5;

          }else{
            width =  this.allAyas[j].arrOfColoredWords[i].word.length * 5;
            if (this.allAyas[j].arrOfColoredWords[i].word != "" && this.allAyas[j].arrOfColoredWords[i].word.length > 2 && this.inputs[j].spans.length > this.allAyas[j].arrOfColoredWords[i].lineIndex) {
              top = this.inputs[j].spans[this.allAyas[j].arrOfColoredWords[i].lineIndex].top;
              left = parseInt(this.allAyas[j].arrOfColoredWords[i].left);
            }

          }
          if (currentWord != undefined) {
            if ((left - width - space) > 50) {
              left = left - width - space;
              this.spansOfColoredWords.push({
                top: parseInt(top) + 35 + "px",
                color: this.allAyas[j].arrOfColoredWords[i].color,
                width: width + 'px',
                left: left + 'px'
              });
              isMoveToNextLine = false;
            } else {
              isMoveToNextLine = true;
              lineIndex++;
              top = this.inputs[j].spans[lineIndex].top.split("px")[0];
              left = parseInt(this.inputs[j].spans[lineIndex].left) + parseInt(this.inputs[j].spans[lineIndex].width) - width - space;
              this.spansOfColoredWords.push({
                top: parseInt(top) + 35 + "px",
                color: this.allAyas[j].arrOfColoredWords[i].color,
                width: width + 'px',
                left: left + 'px'
              });
            }
          } else {
            left = left - width - space;
            this.spansOfColoredWords.push({
              top: parseInt(top) + 35 + "px",
              color: this.allAyas[j].arrOfColoredWords[i].color,
              width: width + 'px',
              left: left + 'px'
            });
          }


          lastWord = this.allAyas[j].arrOfColoredWords[i].word;

        }
        previousColor = this.allAyas[j].arrOfColoredWords[i].color;

      }
      console.log(this.spansOfColoredWords);
      this.inputs[j].spansOfColoredWords = this.spansOfColoredWords;
      console.log(this.inputs[j])


    }
  }


  private fillRightArrayFirst(index, mooade3: { suraWithIndex: string; aya?: string, id: string }[], ayaStart, ayaEnd) {
    // debugger
    let rightArr = '';
    // let  ayat =[];
    for (let i = 0; i < mooade3.length; i++) {
      // ayat.push(mooade3[i].aya);
      // if (this.lastTopRight == 0) {//for first aya contains motashabeh in page
      this.lastTopRight += 30;
      if (this.lastTopRight < ayaEnd + 10) {
        // rightArr.push(mooade3[i]);
        // while(mooade3[i].suraWithIndex.length<15) {mooade3[i].suraWithIndex += " ";}
        rightArr = rightArr + mooade3[i].suraWithIndex + '';
        let top = (index == 0) ? ayaStart : ayaStart - 30;
        if (i == mooade3.length - 1) {
          this.motashabehatSpans.push({
            top: top + 'px',
            isRight: false,
            moade3: rightArr,
            height: (ayaEnd - ayaStart - 15) + 'px'
          });
          this.inputs[index].motashabehatSpans = this.motashabehatSpans;
          console.log(rightArr);
        }

      } else {
        this.motashabehatSpans.push({
          top: ayaStart + 'px',
          isRight: false,
          moade3: rightArr,
          height: (ayaEnd - ayaStart - 30) + 'px'
        });
        this.inputs[index].motashabehatSpans = this.motashabehatSpans;
        console.log(rightArr)
        return i;
      }
    }
    // this.inputs[index].ayat = ayat;

  }
  static lastTop = 10;

  private addMoade3(index: number, moade3: { suraWithIndex: string; aya?: string; id: string }[], ayaStart: number, ayaEnd: number) {
    let motashabehat: { isRight: boolean; moade3: any[], height: string, top: string } = {top:'',height:'',isRight:true,moade3:[]};
    let arr:{top:string,suraWithIndex: string; aya?: string; id: string}[] = [];
    if(HolyQuranComponent.lastTop == 10){
      HolyQuranComponent.lastTop = ayaStart
    } else {
      HolyQuranComponent.lastTop += 25
    }
    if(moade3 && moade3.length>0){
      moade3.forEach(m=>{
        if(m.suraWithIndex!="") {
          arr.push({
            top: HolyQuranComponent.lastTop + 'px',
            suraWithIndex: m.suraWithIndex,
            aya: m.aya,
            id: m.id
          });

          HolyQuranComponent.lastTop += 25
        }
      });
// debugger
      motashabehat.height = ((parseInt(arr[arr.length-1].top)+25) - parseInt(arr[0].top))  + 'px';
      motashabehat.moade3 = arr;
      this.inputs[index].motashabehat = motashabehat;


    }
  }
}

