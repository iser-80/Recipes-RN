import { View, Text } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { ClockIcon, StarIcon } from 'react-native-heroicons/solid'
import { Touchable } from 'react-native'


export default function RecipeCard({ recipe }) {
    const description = recipe.description.substring(0, 60)
    
  return (
        <View className='w-full h-[120px] mb-2 flex flex-row bg-white rounded-md overflow-hidden' style={{elevation: 5}}>
        <Image source={recipe.image} className='h-full w-[30%]'/>
        <View className='flex-1 px-3 py-2'> 
            <Text className='text-base' style={{fontFamily: 'poppins'}}>{recipe.title}</Text>
            <Text className='text-md text-gray-500'>{description} ..</Text>
            <View className='flex-1 flex flex-row items-center'>
                <View className='flex flex-row items-center'>
                    <ClockIcon color='green' />
                    <Text className='ml-1 text-md'>{recipe.time} min</Text>
                </View>
                <View className='flex flex-row items-center ml-2'>
                    <StarIcon color='yellow'/>
                    <Text className='ml-1 text-md'>{recipe.difficulty}</Text>
                </View>
            </View>
        </View>
        </View>
  )
}