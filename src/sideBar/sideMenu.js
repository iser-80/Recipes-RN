import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useTheme } from '../theme/theme';
import { XMarkIcon } from 'react-native-heroicons/outline';

export default function SideMenu({ closeSideMenu }) {
    const { isDarkMode, toggleTheme } = useTheme();

  return (
    <View className=' flex-1 absolute h-full w-full bg-black/50'>
      <View className='h-full w-[80%] p-10' style={{backgroundColor: isDarkMode ? '#FFFFFF' : '#323031'}}>
        <TouchableOpacity className='py-4 border-b border-b-stone-500 items-center justify-center'>
          <Text className='text-lg' style={{color: isDarkMode ? '#323031' : '#FFFFFF', fontFamily: 'poppins'}}>Option 1</Text>
        </TouchableOpacity>
        <TouchableOpacity className='py-4 border-b border-b-stone-500 items-center justify-center'>
          <Text className='text-lg' style={{color: isDarkMode ? '#323031' : '#FFFFFF', fontFamily: 'poppins'}}>Option 2</Text>
        </TouchableOpacity>
        <TouchableOpacity className='flex flex-row py-4 items-center justify-center' onPress={closeSideMenu}>
          <XMarkIcon size={30} color={isDarkMode ? '#323031' : '#FFFFFF'}/>
          <Text className='text-lg ml-2' style={{color: isDarkMode ? '#323031' : '#FFFFFF', fontFamily: 'poppins'}}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}