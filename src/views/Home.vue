<template>
  <div>
    <Header />
    <div class="main">
      <div class="tryLang">
        <div class="tryLangArea">
          <textarea v-model="sourceCode" class="tryLangIDE form-control">
          </textarea>
          <div class="tryLangStdOut">
            <div class="tryLangStdOutArea">
              <span v-for="(stackTrace, stdOutLine) in stdOut" :key="stackTrace">
                <span>
                  {{
                    stackTrace
                  }}
                </span>
                <hr v-if="stdOutLine < stdOut.length" />
              </span>
            </div>
            <div class="tryLangStdOutProgramControls">
              <button class="btn btn-success tryLangStdOutProgramControl" @click="runProgram">
                Run
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>

import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Home',
  data() {
    return {
      sourceCode: '',
      stdOut: [],
      langExtension: 'bytecode'
    }
  },
  methods: {
    throwException(exception) {
      alert(`${exception.class}: ${exception.line.code}`)
      this.stdOut.push(`${exception.class}: строка № ${exception.line.index}; #${exception.line.code}`)
    },
    runProgram() {
      this.stdOut = []
      let blocks = 0
      let isClassMustHave = false
      let isMainFunctionMastHave = false
      this.sourceCode.split('\n').map((sourceCodeLine, sourceCodeLineIdx) => {
        let isEndLine = this.sourceCode.split('\n').length - 1 === sourceCodeLineIdx
        if (sourceCodeLine.match(/^class .* \{$/) && !isClassMustHave) {
          blocks++
          isClassMustHave = true
          this.stdOut.push(`${sourceCodeLineIdx + 1}) Запускаю ${sourceCodeLine.replace(/class /, '').replace(/ \{/, '')}.${this.langExtension}`)
        } else if (blocks >= 1 && isClassMustHave) {
          let isExpression = sourceCodeLine.match(/^.*print\(\'.*\'\).*$/)
          if (sourceCodeLine.match(/^.*\{.*$/)) {
            blocks++
            if (sourceCodeLine.match(/^.*void main.*\(.*\).*\{.*$/)) {
              isMainFunctionMastHave = true
            }
          } else if (sourceCodeLine.match(/^.*\}.*$/)) {
            blocks--
            if (isMainFunctionMastHave) {
              isMainFunctionMastHave = false
            }
          } else if (!isExpression) {
            let exception = {
              class: 'NotRightMarkupException',
              line: {
                code: sourceCodeLine,
                index: sourceCodeLineIdx
              }
            }
            this.throwException(exception)
          } else if (isExpression && isMainFunctionMastHave) {
            // выполнить команду
            this.stdOut.push(`${sourceCodeLineIdx + 1}) ${sourceCodeLine.replace(/print\(\'/, '').replace(/\'.*\).*/, '')}`)
          }
        } else {
          if (blocks === 0 && isClassMustHave) {
            let exception = {
              class: 'NotRightMarkupException',
              line: {
                code: sourceCodeLine,
                index: sourceCodeLineIdx
              }
            }
            this.throwException(exception)
          } else if (isEndLine && !isClassMustHave) {
            let exception = {
              class: 'ClassNotFoundException',
              line: {
                code: sourceCodeLine,
                index: sourceCodeLineIdx
              }
            }
            this.throwException(exception)
          }
        }
        
      })
      
    }
  },
  components: {
    Header,
    Footer
  }
}
</script>
<style scoped>
  
  .tryLang {
    display: flex;
    justify-content: center;
    height: 350px;
  }

  .tryLangArea {
    width: 75%;
    display: flex;
    justify-content: center;
  }

  .tryLangIDE {
    box-sizing: border-box;
    padding: 15px;
    width: 65%;
    background-color: rgb(75, 75, 75);
    color: rgb(255, 255, 255);
  }

  .tryLangStdOut {
    box-sizing: border-box;
    padding: 15px;
    width: 35%;
    background-color: rgb(245, 245, 245);
    display: flex;
    flex-direction: column;
  }

  .tryLangStdOutArea {
    overflow-y: scroll;
    height: 85%;
    display: flex;
    flex-direction: column;
  }

  .tryLangStdOutProgramControls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 15%;
  }

  .tryLangStdOutProgramControl {
    width: 100px;
  }

</style>