import React from 'react';
 import shortid from 'shortid';

function App() {
  
  const [ciudad, setCiudad]=React.useState(' ');
  const [ciudades,setCiudades]=React.useState([]);
  const [error,setError]=React.useState(null);
  
  const agregarCiudad = e =>
  {
    e.preventDefault();
    
//  Verifica que el campo ciudad tenga texto
    if(!ciudad.trim())
    {
      console.log('Elemento Vacio');
      setError('Escriba algo por favor...');
      return;
    }
    console.log(ciudad);
    
 //SOLICITUD
 let url="https://api.open-meteo.com/v1/forecast?latitude=-34.6118&longitude=-58.4173&hourly=temperature_2m,windspeed_10m";

 fetch(url)
  .then(response => response.json())  //resuelve la promesa, entonces lo maneja con un json()
  .then(data => mostrarData(data))  //aqui maneja los datos, llama la funcion pasando como parametro data
  .catch(error => console.log(error))  //en caso de error dispara el catch

  // const arrayDatos=data.results.map(x => x.latitud);
  // console.log(arrayDatos)
  
  
  const mostrarData = (data)=>{
    console.log(data);
    
      let latitud = data['latitude'];
      let longitud  = data['longitude'];
      let hourly = data['hourly'];
       
      console.log(latitud);
      console.log(longitud);
      console.log(hourly);
  }

    //AGREGA UNA NUEVA CIUDAD
    setCiudades([
      ...ciudades,
      {id:shortid.generate(), nombreCiudad:ciudad}     //Generamos id de forma automatica      
    ])
    
    // Limpia el campo ciudad
    setCiudad(' ');
    setError(null);
  }

  // ELIMINAR CIUDAD
  const eliminarCiudad =id=>{
  //  console.log(id);
  const arrayFiltrado=ciudades.filter(item =>item.id !==id);
  setCiudades(arrayFiltrado);
  }
  

  return (
    <div className="container">
       <h1 className="text-center mt-5">CLIMA</h1>
        <hr/>
           <div className="row">
                   <div className="col-md-8">
                        <h4 className="text-center">Lista de Tareas</h4>
                              
                              <ul className="list-group">
                                 {
                                  ciudades.length===0?(
                                     <li className='list-group-item'>No hay Ciudades</li>
                                  ):(
                                    ciudades.map(item =>(
                                      
                                      <li className="list-group-item" key={item.id}>  
                                       <span className="lead">{item.nombreCiudad}</span>
                                       

                                       <button 
                                                 className="btn btn-danger btn-sm float-right mx-2"
                                                 onClick={()=>eliminarCiudad(item.id)}>
                                                 Eliminar
                                         </button>
                                       <button className="btn btn-warning btn-sm float-right">Editar</button>
                                     </li>
                                     ))
                                  )
                                   
                                 }
                                      
                             </ul>
                  </div>
            
                   <div className="col-md-4">
                        <h4 className="text-center">Formulario</h4>
                           <form onSubmit={agregarCiudad}>
                                 {
                                   error ? <span className='text-danger'>{error}</span>:null
                                 }
                                 <input
                                    type="text"
                                    className="form-control mb-2"
                                    placeholder="Ingrese Nombre de Ciudad"
                                    onChange={e=>setCiudad(e.target.value)}
                                    value={ciudad}>
                                  </input>

                                  <input
                                    type="text"
                                    className="form-control mb-2"
                                    placeholder="Ingrese Latitud">               
                                  </input>

                                  <input
                                      type="text"
                                      className="form-control mb-2"
                                      placeholder="Ingrese Longitud">               
                                  </input>
                                  
                                  <button className="btn btn-dark btn-block" type="submit">Agregar</button>
                           </form>
                   </div>
           </div>
    </div>
  );
}

export default App;
