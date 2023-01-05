import React from 'react'
import { useState, useStateValue } from 'react'
import { motion } from 'framer-motion'
import { categories } from '../utils/StaticData'
import { Loader } from '.'
import { deleteObject, getDownloadURL, ref, uploadBytesResumable, } from 'firebase/storage'
import {
  MdFastfood,
  MdCloudUpload,
  MdDelete,
  MdFoodBank,
  MdAttachMoney,
} from "react-icons/md";
import { storage } from '../firebase.config'
import { saveItem } from '../utils/firebaseFunctions'
import { useSateValue } from '../context/StateProvider'



const CreateContainer = () => {

  const [title, setTitle] = useState()
  const [calories, setCakories] = useState()
  const [price, setPrice] = useState()
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [fields, setFields] = useState(true);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
   const [{ foodItems, }, dispatch] = useSateValue();


  const uploadImage = (e) => {
    setIsLoading(true)
    const imageFile = e.target.files[0]
    const storageRef = ref(storage, `image/${Date.now()}-${imageFile.name}`)
    const uploadTask = uploadBytesResumable(storageRef, imageFile)
    uploadTask.on(
      'state_changed', (snpshot) => {
        const uploadProgress = (snpshot.bytesTransferred / snpshot.totalBytes) * 100
      }, (error) => {
        setFields(true)
        setMsg('Something went wrong : Try again please 🙇🙇🙇')
        setAlertStatus('danger')
        setTimeout(() => {
          setFields(false)
          setIsLoading(false)
        }, 4000)
      }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          setImageAsset(downloadURL)
          setIsLoading(false)
          setFields(true)
          setMsg('Uploaded Successfully 😊😊😊')
          setAlertStatus('succuss')
          setTimeout(() => {
            setFields(false)
          }, 4000);
        })
      }
    )
  }

  const deleteImage = () => {
    setIsLoading(true)
    const deleteRef = ref(storage, imageAsset)
    deleteObject(deleteRef).then(() => {
      setImageAsset(null)
      setIsLoading(false)
      setFields(true)
      setMsg('Image Deleted Successfully 😒😒')
      setAlertStatus('success')
      setTimeout(() => {
        setFields(false)
      }, 4000);
    })
  }



  function saveDetails() {
    setIsLoading(true)
    try {
      if ((!title || !price || !calories || !imageAsset || !price || !category)) {
        setFields(true)
        setMsg('All fields required paddy : Try again please 🙇🙇🙇')
        setAlertStatus('danger')
        setTimeout(() => {
          setFields(false)
          setIsLoading(false)
        }, 4000)
      } else {
        const data = {
          id: `${Date.now()}`,
          title: title,
          imgeURL: imageAsset,
          category: category,
          calories: calories,
          qty: 1,
          price: price


        }
        saveItem(data)
           setImageAsset(null)
      setIsLoading(false)
      setFields(true)
      setMsg('Updated Data successfully 😒😒')
      setAlertStatus('success')
      clearData()
      setTimeout(() => {
        setFields(false)
        
      }, 4000);
        
      }
    } catch {

      setFields(true)
      setMsg('Something went wrong : Try again please 🙇🙇🙇')
      setAlertStatus('danger')
      setTimeout(() => {
        setFields(false)
        setIsLoading(false)
      }, 4000)

    }

  }

  const clearData = ()=>{
    setTitle("")
    setImageAsset(null)
    setCakories('')
    setPrice('')
    setCategory("Select Category")
  }

  
const fetchData = async () =>{
  await getAllFoodItems().then((data)=>{
    console.log(data)
    dispatch({
      type : actionType.SET_FOOD_ITEMS,
      foodItems: data
    })
  })
}


  return (
    <div className='w-full min-h-screen flex items-center justify-center'>
      <div className="flex w-[90%] md:w-[75%] boder border-gray-300 rounded-lg p-4 flex-col item-center justify-center">
        {fields && (
          <motion.p
            inherit={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20
            }}
            className={`w-full p-2 rounded-lg text-center font-bold ${alertStatus === 'danger' ? 'bg-red-400 text-red-800' : 'bg-emerald-400 text-emerald-800'}`}>
            {msg}
          </motion.p>
        )}
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdFastfood className="text-xl text-gray-700" />
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give me a title..."
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
          />
        </div>

        <div className="w-full">
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
          >
            <option value="other" className="bg-white">
              Select Category
            </option>
            {categories &&
              categories.map((item) => (
                <option
                  key={item.id}
                  className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                  value={item.urlParamName}
                >
                  {item.name}
                </option>
              ))}
          </select>
        </div>
        <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-full md:h-420 cursor-pointer">  {isLoading ? <Loader /> : <>
          {!imageAsset ? <>
            <label className='w-full h-full flex flex-col items-center justify-center cursor-pointer rounded-lg'>
              <div className='w-full h-full gap-2 flex flex-col items-center justify-center cursor-pointer'>
                <MdCloudUpload className='text-gray-500 text-3xl ' />
                <p className='text-gray-500  '>Click here to upload</p>
              </div>
              <input type='file' name='uploadimage' accept='image/*' className='w-0 h-0'
                onChange={uploadImage} />
            </label>
          </> : <>
            <div className='relative h-full  mt-2'>
              <img src={imageAsset} alt="" className='w-full h-full object-cover' />
              <button className='absolute bottom-3 right-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out'
                onClick={deleteImage}>
                <MdDelete className='text-white m-1' />
              </button>
            </div>
          </>}
        </>}</div>
        <div className="flex flex-col md:flex-row">
          <div className="w-full flex mt-4 flex-row items-center gap-3 "> <MdFoodBank className='text-gray-700 text-2xl' />
            <input type='text' required placeholder='calories' value={calories} onChange={(e) => setCakories(e.target.value)} className='w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor' />
          </div>
          <div className="w-full flex mt-4 flex-row items-center gap-3 "> <MdAttachMoney className='text-gray-700 text-2xl' />
            <input type='text' required placeholder='price' value={price} onChange={(e) => setPrice(e.target.value)} className='w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor' />
          </div>
        </div>

        <div className="flex items-center w-full mt-3 " >
          <button type='button' onClick={saveDetails} className='ml-0 md:ml-auto w-full rounded-lg bg-orange-500 md:w-auto font-semibold text-white text-xl p-2'>Save</button>
        </div>
      </div>

    </div>
  )
}

export default CreateContainer