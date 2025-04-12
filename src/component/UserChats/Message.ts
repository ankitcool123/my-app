// type MessageEnum = {
//     id: number;
//     senderId: number;
//     senderUsername: string;
//     senderPhotoUrl: string;
//     recipientId: number;
//     recipientUsername: string;
//     recipientPhtotUrl: string;
//     content: string;
//     dateRead?: any;
//     messageSent: Date;


// };
// export default MessageEnum;
// types/Message.ts

export interface Message {
    messageSent: any;
    senderUsername: string;
    senderPhotoUrl: string;
    content: string;
    tempId?: number;
  }
  