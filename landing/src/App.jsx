import './App.css'
import Threads from './components/Threads'

function App() {
  return (
    <>
      <div style={{ position:'relative', height:'60vh', minHeight:480, borderRadius:12, overflow:'hidden', border:'1px solid #333' }}>
        <Threads amplitude={1} distance={0} enableMouseInteraction={true} />
        <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', color:'#fff', textAlign:'center', padding:24, pointerEvents:'none' }}>
          <h1 style={{ fontSize:48, marginBottom:8 }}>GINHAWA</h1>
          <p style={{ opacity:.85 }}>Experience Comfort and Relaxation</p>
        </div>
      </div>
    </>
  )
}

export default App
