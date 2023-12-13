import { View, Text } from 'react-native'
import React from 'react'
import { MoonIcon } from 'react-native-heroicons/outline'
import { Bars3BottomLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/solid'
import { TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native'
import { Keyboard } from 'react-native'
import { FlatList } from 'react-native'

export default function Home() {
  return (
      <View className='flex-1 bg-white p-5'>
        <View className='flex flex-row items-center justify-between mt-4'>
          <TouchableOpacity>
            <Bars3BottomLeftIcon size={30} color='black'/>
          </TouchableOpacity>
          <TouchableOpacity>
            <MoonIcon size={30} color='black'/>
          </TouchableOpacity>
        </View>
        <Text className='text-4xl pr-[20%] mt-5' style={{fontFamily: 'kalnia-semiBold'}}>
          What Would You Like To Cook Today ?
        </Text>
        <View className='flex flex-row items-center bg-gray-100 py-3 px-4 mt-3 rounded-lg'>
          <MagnifyingGlassIcon size={25} color='gray'/>
          <TextInput 
            className='ml-4 w-full' 
            style={{fontFamily: 'poppins'}}
            placeholder='Search for your recipe'
          />
        </View>
        <View className='mt-2'>
          <FlatList
            className='py-2'
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) =>{ return <Text style={{marginHorizontal: 10}} >{item}</Text> }}
          />
        </View>
      </View>
  )
}

const categories = [
  'All',
  'Appetizers',
  'Main Dishes',
  'Salads',
  'Soups',
  'Desserts',
  'BreakFast',
  'Snacks'
]