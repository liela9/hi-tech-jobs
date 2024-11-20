// TODO: remove file?

// import { useState, useEffect } from 'react';
// import { Socket, io } from 'socket.io-client';


// const useWebSocket = () => {
//   const [socket, setSocket] = useState<Socket | null>(null);

//   useEffect(() => {
//     const socketio = io('http://localhost:3000'); 
//     setSocket(socketio);

//     socketio.on('connect', () => {
//       console.log('WebSocket connected');
//     });

//     socketio.on('disconnect', () => {
//       console.log('WebSocket disconnected');
//     });

//     return () => {
//       if (socket) {
//         socket.disconnect();
//       }
//     };
//   }, []);

//   return { socket };
// };

// export default useWebSocket;