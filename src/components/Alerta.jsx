import React from 'react'

const Alerta = ({alerta}) => {
  return (
    <div className={`${alerta.error ? 'border-red-600 text-red-600' : 'border-indigo-600 text-indigo-600'} text-center p-3 rounded-xl uppercase border-4 font-black text-sm mb-10`}>
        {alerta.msg}
    </div>
  )
}

export default Alerta