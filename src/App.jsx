import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';

function App() {
  const [reqText, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [charLim, setCharLim] = useState(100);
  const [includeHash, setIncludeHash] = useState(true);

  async function generateResponse(){

    setOutput('Loading...');

    let prompt = 'Generate a tweet about '
    prompt = prompt.concat(reqText);
    prompt = prompt.concat(' within the character limit of ').concat(charLim);

    if(includeHash){
      prompt = prompt.concat(' include hashtags');
    } else {
      prompt = prompt.concat(' include hashtags');
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

    setOutput(response['data']['candidates'][0]['content']['parts'][0]['text']);
  }

  return (
    <>
      <table>
        <tbody>
          <tr>
            <td><textarea rows='10' cols='50' name='input' id='input' value={reqText} onChange={e => setInput(e.target.value)} style={{margin:20}}/></td>
            <td><textarea rows='10' cols='50' name='output' id='output' value={output} readOnly/></td>
          </tr>
          <tr>
            <td>
              <table>
                <tbody>
                  <tr>
                    <td>Character Limit: </td>
                    <td><input type="number" name="charLim" id="charLim" onChange={e => setCharLim(e.target.value)}/></td>
                    <td>Include Hashtags: </td>
                    <td><input type="checkbox" name='isHash' id='isHash' checked={includeHash} onChange={e => setIncludeHash(e.target.checked)}/></td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td colSpan={2} align='center'>
              <button onClick={generateResponse}>Generate</button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default App
