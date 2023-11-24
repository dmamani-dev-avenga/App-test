import HeroImg from "./assets/istockphoto-1388268597-1024x1024.jpg"
import Logo from "./assets/emergencias-salud.jpg"
import Form from "./components/Form"

function App() {
  return (
    <main
      aria-label="Iniciar sesión en Emergencias Salud"
      className="min-h-screen flex flex-col max-lg:justify-center max-lg:items-stretch lg:flex-row-reverse max-lg:p-4"
    >
      <section className="lg:w-1/2 flex flex-col items-center gap-12 py-16 h-screen overflow-y-scroll">
        <img src={Logo} alt="" className="w-[200px]" />
        <Form />
      </section>
      <section className="max-lg:hidden w-1/2">
        <img
          src={HeroImg}
          alt="Médica atendiendo"
          className="h-full object-cover"
        />
      </section>
    </main>
  )
}

export default App
