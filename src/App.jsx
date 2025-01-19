import { useState } from 'react'
import './App.css'
import axios from 'axios';
import { FormControlLabel, FormGroup, Paper, Switch } from '@mui/material';
import LoadingButtonComp from './components/LoadingButtonComponent';
import TextFieldComponent from './components/TextFieldComponent';

function App() {
  const [reqText, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [charLim, setCharLim] = useState(100);
  const [includeHash, setIncludeHash] = useState(true);
  const [isResLoading, setIsResLoading] = useState(false);
  const [carLimValidation, setCarLimValidation] = useState('');

  //Values
  const includeValuesCheckbox = ['Include Hashtags'];

  async function generateResponse(){

    setIsResLoading(true);
    console.log('Generation Started');

    let prompt = 'Generate a tweet about '
    prompt = prompt.concat(reqText);
    prompt = prompt.concat(' within the character limit of ').concat(charLim);

    if(includeHash){
      prompt = prompt.concat(' include hashtags');
    } else {
      prompt = prompt.concat(' do not include hashtags');
    }

    const response = await axios({
      url:"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCYW5xkgBy-0WMC6PINtQXTaQsBB-8VckM",
      
      method:"post",

      data:{
        "contents": [{
          "parts":[{"text": prompt}]
        }]
      }
    })

    setIsResLoading(false);
    setOutput(response['data']['candidates'][0]['content']['parts'][0]['text']);
    console.log(output);
  }

  function handleCharLim(value){
    if(value < 50){
      setCharLim(50);
      setCarLimValidation('A tweet should have minimum 50 characters');
    }
    else if(value > 280){
      setCharLim(280);
      setCarLimValidation('A tweet can have maximum 280 characters');
    }
    else{
      setCharLim(value);
      setCarLimValidation('');
    }
  }

  return (
    <>
      <table>
        <tbody>
          <tr>
            <td>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <Paper elevation={3} sx={{minHeight: 350, minWidth:'500px', padding: '20px', margin: '10px'}}>
                        <TextFieldComponent fieldValue={output} rows={10} fieldLabel={'Tweet'} isMultiLined={true} isFullWidth={true} />
                      </Paper>
                    </td>
                    <td>
                      <Paper elevation={3} sx={{minHeight: 350, padding: '20px', margin: '10px'}}>
                        <table>
                          <tbody>
                            <tr>
                              <td>
                                <TextFieldComponent fieldValue={reqText} rows={5} fieldLabel={'Key words'} isMultiLined={true} isFullWidth={true} onChangeFun={e => setInput(e.target.value)}/>
                              </td>
                            </tr>
                            <tr>
                              <td style={{height: '10px'}}>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <TextFieldComponent fieldValue={charLim} rows={1} fieldLabel={'Character Limit'} isMultiLined={false} fieldSize={'small'} onBlurFun={e => handleCharLim(e.target.value)} onChangeFun={e => setCharLim(e.target.value)} fieldType={'number'}/>
                              </td>
                            </tr>
                            <tr>
                              <td style={{height: '10px'}}>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <FormGroup>
                                  <FormControlLabel control={<Switch checked={includeHash} onChange={e => setIncludeHash(!includeHash)}/>} label='Include Hashtags'/>
                                </FormGroup>
                              </td>
                            </tr>
                            <tr>
                              <td style={{height: '10px'}}>
                              </td>
                            </tr>
                            <tr>
                              <td style={{height: '10px'}}>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <LoadingButtonComp isLoading={isResLoading} onClickFunction={generateResponse} buttonSize={'small'}/>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </Paper>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default App
