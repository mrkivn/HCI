import './App.css'
import Threads from './components/Threads'
import Particles from './components/Particles'

function App() {
  return (
    <>
      <div style={{ position: 'relative', height: '60vh', minHeight: 480, borderRadius: 12, overflow: 'hidden', border: '1px solid #333', background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' }}>
        <Particles particleCount={300} particleSize={3} speed={0.1} color="#ffffff" />
        <Threads amplitude={1} distance={0} enableMouseInteraction={true} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: '#fff', textAlign: 'center', padding: 24, pointerEvents: 'none', zIndex: 10 }}>
          <h1 style={{ fontSize: 48, marginBottom: 8 }}>GINHAWA</h1>
          <p style={{ opacity: .85, fontSize: 18 }}>Experience Comfort and Relaxation</p>
        </div>
      </div>
    </>
  )
}

export default App
