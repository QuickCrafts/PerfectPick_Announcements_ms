export interface ILikes {
  id: number
  user_id: number
  type: 'MOV' | 'BOO' | 'SON'
  rating?: number // given by the user searched
  like_type: 'LK' | 'DLK' | 'BLK' // Liked | Disliked | Blank (no info yet)
  wishlist: boolean // Inside user wishlist? Yes or No
}
