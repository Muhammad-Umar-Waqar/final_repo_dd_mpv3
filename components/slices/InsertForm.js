import React from "react";
import { Box } from '@mui/material';

const Contact = () => (
  <div>
    <h1 className="text-center mt-5">Contacto</h1>
    <main className="md:grid md:grid-cols-5 justify-center auto-rows-max gap-4 md:gap-8 px-4">
      <form name="Contact Form" method="POST" data-netlify="true" action="/gracias" className="md:col-start-2 md:col-end-5">
        <input type="hidden" name="form-name" value="Contact Form" />
        <div>
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">Tu correo:</label>
          <input type="email" name="email" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
        </div>
        <div>
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="message">Mensaje:</label>
          <textarea name="message" className="no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none" />
        </div>
        <button type="submit" className="border border-themeBrandColor border-solid bg-themeBrandColor hover:bg-white  hover:text-themeBrandColor focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">Enviar</button>
      </form>


    </main>


  </div>

)

const insertForm = (allSlices) => {
  // console.log(allSlices)
  switch (allSlices.input.primary.form_type) {
    // These are the API IDs of the slices
    case 'contactus':
      return <Contact />
    default:
      return null
  }
};

const InsertForm = ({ input }) => {
  return (
    <Box
      sx={{
        my: 4,
        '& iframe': {
          width: '100%',
          border: 'none',
          minHeight: '400px'
        }
      }}
      dangerouslySetInnerHTML={{ __html: input.primary.form_embed.text }}
    />
  );
};

export default InsertForm


