import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

// Necesario para resolver __dirname en ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  entry: './scripts/main.js', // Archivo de entrada principal
  output: {
    path: path.resolve(__dirname, 'dist'), // Carpeta de salida
    filename: 'bundle.js', // Nombre del archivo de salida
  },
  mode: 'production', // O 'production', según el entorno
  module: {
    rules: [
      {
        test: /\.js$/, // Procesar todos los archivos .js
        exclude: /node_modules/, // Excluir la carpeta node_modules
        use: {
          loader: 'babel-loader', // Usar Babel para transformar el código si es necesario
        },
      },
    ],
  },
};

