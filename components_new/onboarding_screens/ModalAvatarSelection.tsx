import React, { ChangeEventHandler, Dispatch, useState } from 'react'
import MuiModal from '@mui/material/Modal'
import { avatarModalState } from '../../atoms';
import { useRecoilState } from 'recoil';
import { Avatar } from '../../components/editor/inputs/avatar';
import Image from 'next/image';

interface modalAvatarProps {
  handleFile: ChangeEventHandler<HTMLInputElement> | undefined;
  handleSrc: Dispatch<any>;
  handleFetch: () => Promise<string[]>;
}

interface imgGridProps {
  imgList: string[];
  retrieveSrc: Dispatch<any>;
  handleModalClose: () => void;
}

const ImgGrid = (props: imgGridProps) => {
  return(
    <div
      className="grid grid-cols-1 auto-rows-auto gap-3 place-items-center items-center
                 justify-center overflow-y-auto overflow-x-hidden"
    >
      {props.imgList.map(img => (
          <Image 
            key={img}
            src={img}
            id={img}
            alt="Image Option"
            width={170}
            height={170}
            className="cursor-pointer hover:transition hover:shadow-lg hover:bg-indigo-600 duration-200 ease-in-out 
                      hover:scale-[1.1] active:scale-[0.98] rounded-xl"
            objectFit="cover"
            onClick={(e) => {
              const target = e.target as HTMLImageElement;
              props.retrieveSrc(target.id);
              props.handleModalClose();
            }}
          />
      ))}
    </div>
  );
}

function ModalAvatarSelection(props: modalAvatarProps) {

  const [showModal, setShowModal] = useRecoilState(avatarModalState);
  const handleClose = () => {  setShowModal(false )}
  const [fetchingNft, setFetchingNft] = useState<boolean>(false);
  const [error, setError] = useState<any>('');
  const [images, setImages] = useState<string[]>([]);

  const buttonClass = 'cursor-pointer items-center rounded-full bg-[#1273ea] text-white font-semibold py-4 px-11 mb-[10px]';
  
  const fetchNfts = async() => {
      //@ts-ignore
      if(images.length === 0) {
        setFetchingNft(true);
        try {
          const img = await props.handleFetch();
          setImages(img);
          setFetchingNft(false);
        } catch (e) {
          setError(e);
          setFetchingNft(false);
        }
      }
  }

  const imgFilehandler = (e: any) => {
    if (e.target.files.length !== 0) {
      //@ts-ignore
      props.handleFile(e.target.files[0]);
      handleClose();
    }
  }

  return (
    <MuiModal
        className="fixes !top-7 left-0 right-0 
          z-50 mx-auto w-full max-w-5xl 
          overflow-hidden overflow-y-scroll 
          rounded-md scrollbar-hide items-center flex flex-col justify-center
          "
        open={showModal}
        onClose={handleClose}>
        <>
            <section className='relative bottom-10 bg-white w-[388px] rounded-[20px] h-5/6 md:h-4/6'>
                <div className='flex flex-col justify-center items-center h-full'>
                    <p className='text-center font-semibold text-3xl mb-[30px] mt-[10px]'>Select an Avatar</p>
                    {/*Upload Profile Picture*/}
                    
                    {images.length === 0 ?
                      <div className='space-y-3 relative'>
                          {error ?
                            <div className={buttonClass+(fetchingNft ? " animate-pulse" : "")} onClick={fetchNfts}>
                              {!fetchingNft ?
                              "There was an error. Try again."
                              :
                              "Fetching Collection.."
                              }
                            </div>
                          : 
                            <div className={buttonClass+(fetchingNft ? " animate-pulse" : "")} onClick={fetchNfts}>
                              {!fetchingNft ?
                              "Add from NFT collections"
                              :
                              "Fetching Collection.."
                              }
                            </div>
                          }
                          <label htmlFor="dropzone-file" >
                            <div className={buttonClass}>
                              Choose From Computer
                            </div>
                            <input 
                              id="dropzone-file" 
                              type="file" 
                              accept="image/*" 
                              className="hidden" 
                              onChange={(e) => imgFilehandler(e)}
                            />
                          </label>
                        </div>
                        :
                        <>
                          <div className='h-5/6 md:h-full overflow-y-auto w-full'>
                            <ImgGrid 
                              imgList={images}
                              retrieveSrc={props.handleSrc}
                              handleModalClose={handleClose}
                            />
                          </div>
                          <p className="text-center mt-1 text-sm text-[#8e8e8f] cursor-pointer" onClick={() => setImages([])}>Go Back</p>
                        </>
                    } 
                </div>
            </section>
        </>
    </MuiModal>
  )
}

export default ModalAvatarSelection;