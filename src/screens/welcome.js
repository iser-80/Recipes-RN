import { View, Text } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { TouchableOpacity } from 'react-native' 
import { ArrowSmallRightIcon } from 'react-native-heroicons/solid'

export default function Welcome({ navigation }) {
  return (
    <View className='flex-1 flex relative bg-white'>
      <Image className='h-1/2 w-full mt-20' source={require('../../assets/images/chef.png')} />
      <View className='flex-1 px-6 mt-4'>
        <Text className='text-md text-gray-400' style={{fontFamily: 'poppins'}} >+100 - Premium Recipes</Text>
        <Text className='text-5xl mt-4' style={{fontFamily: 'kalnia-semiBold'}} >Cook Like A Chef</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} className='flex flex-row justify-between items-center w-[50%] px-4 py-3 mt-4 bg-amber-500 rounded-full' style={{elevation: 4}} >
            <Text className='text-lg text-white' style={{fontFamily: 'poppins-semiBold'}} >Get Started</Text>
            <ArrowSmallRightIcon size={30} color='white'/>
        </TouchableOpacity>
      </View>
    </View>
  )
}