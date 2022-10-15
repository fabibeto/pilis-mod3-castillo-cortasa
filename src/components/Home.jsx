import React from 'react';
 import shortid from 'shortid';

const Home = () => {

const [ciudad,setCiudad]=React.useState('');
const [latitud, setLatitud]=React.useState(' ');
const [longitud, setLongitud]=React.useState(' ');
const [ciudades, setCiudades]=React.useState([]);
const [tiempo,setTiempo]=React.useState([]);
const [viento,setViento]=React.useState([]);
const [error,setError]=React.useState(null);

//SOLICITUD DEL CLIMA
// const agregarClima =(latitud,longitud)=>
// {
//   console.log("Agregar Clima",latitud,longitud)

//  if(latitud===" "&& longitud===" ")
//  {
//    console.log('ELEMENTOS VACIOS')
//  }
   
//    let url=`https://api.open-meteo.com/v1/forecast?current_weather=true&latitude=${latitud}&longitude=${longitud}`

//    fetch(url)
//     .then(response => response.json())  //resuelve la promesa, entonces lo maneja con un json()
//     .then(data => mostrarData(data))  //aqui maneja los datos, llama la funcion pasando como parametro data
//     .catch(error => console.log(error))  //en caso de error dispara el catch
// }
  
//  const mostrarData = (data)=>{
//   console.log('Datos',data);
//   console.log('Temperatura :',data.current_weather.temperature)
//   console.log('Veloc. Viento :',data.current_weather.windspeed)
  
//   setTiempo(data.current_weather.temperature)
//   setViento(data.current_weather.windspeed)
//   console.log('Tiempo:',data.current_weather.temperature)
//   console.log('Viento:',data.current_weather.windspeed)
  
//   agregarCiudad(setTiempo,setViento)  
// }


//AGREGAR  CIUDAD
const agregarCiudad = e =>{
  e.preventDefault();
  
  if(!ciudad.trim())
  {
      console.log('Elemento Vacio');
      setError('Escriba algo por favor ...');
      return;
  }
  console.log(ciudad);

   //SOLICITUD DEL CLIMA
   let url=`https://api.open-meteo.com/v1/forecast?current_weather=true&latitude=${latitud}&longitude=${longitud}`;
  
   fetch(url)
    .then(response => response.json())  //resuelve la promesa, entonces lo maneja con un json()
    .then(data => mostrarData(data))  //aqui maneja los datos, llama la funcion pasando como parametro data
    .catch(error => console.log(error))  //en caso de error dispara el catch
  
    
    const mostrarData = (data)=>{
      console.log(data)
      console.log('Temperatura:',data.current_weather.temperature);
      console.log('Veloc.Viento:',data.current_weather.windspeed);
      
      setTiempo(data.current_weather.temperature);
      setViento(data.current_weather.windspeed);
    }

  setCiudades([
      ...ciudades,
      {id:shortid.generate(),nombreCiudad:ciudad,nombreLatitud:latitud,nombreLongitud:longitud,temperatura:tiempo,velocViento:viento}
  ])
  console.log(ciudades);

  setCiudad('');
  setError(null);
}

//ELIMINAR CIUDAD
const eliminarCiudad =id=>{
  const arrayFiltrado= ciudades.filter(item =>item.id !==id);
  setCiudades(arrayFiltrado);
}

  return (
    <div className='container'>
           <h1 className='text-center mt-3'>CLIMA</h1>
           <hr/>
           <div className="row">
                <div className="col-8">
                           <div className="h4 text-center">Ciudades</div>
                           <ul className="list-group">
                               {     
                                   ciudades.length ===0?
                                   (
                                       <li className='list-group-item'>No hay tareas</li>
                                   ):(
                                    ciudades.map(item =>
                                      (
                                        
                                         <li className='list-group-item' key={item.id}>
                                            Ciudad {item.nombreCiudad} <br/>
                                            Latitud {item.nombreLatitud} <br/>
                                            Longitud {item.nombreLongitud} <br/>
                                            Temperatura {item.temperatura} <br/>
                                            Veloc.Viento {item.velocViento} 
                                            
                                            <button 
                                                        className="btn btn-danger btn-sm float-right mx-2"
                                                        onClick={ ()=>eliminarCiudad(item.id)}>
                                                        Eliminar
                                             </button>
  
                                            <button 
                                                         className="btn btn-warning btn-sm float-right">
                                                          Editar
                                              </button>
                                         </li>
                                        
                                      ))
                                   )
                               }
                                 
                           </ul>
                </div>
                
                <div className="col-4">
                    <h4 className="text-center">Formulario</h4>
                    <form onSubmit={agregarCiudad}>
                         {
                            error ? <span className="text-danger">{error}</span> : null
                         }
                            <input
                                 type="text"
                                 className="form-control mb-2"
                                 placeholder="Ingrese Nombre de Ciudad"
                                 onChange={e=>setCiudad(e.target.value)}
                                //  value={ciudad}
                                 >
                             </input>
                             
                             <input
                                 type="text"
                                 className="form-control mb-2"
                                 placeholder="Ingrese Latitud"
                                 onChange={e=>setLatitud(e.target.value)}
                                //  value={ciudad}
                                 >
                             </input>
                             
                             <input
                                 type="text"
                                 className="form-control mb-2"
                                 placeholder="Ingrese Longitud"
                                 onChange={e=>setLongitud(e.target.value)}
                                //  value={ciudad}
                                 >
                             </input>
                               

                               
                          
                           <button className="btn btn-dark btn-block" type='submit'>Agregar</button>

                    </form>
                </div>
           </div>
    </div>
  )
}

export default Home