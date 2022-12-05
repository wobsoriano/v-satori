import { defineComponent, h } from 'vue'

const TWElement = (tag: string, tw: string, children?: any) => h(tag, { tw }, children)

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    return () => TWElement(
      'div',
      'h-full w-full flex items-start justify-start border border-blue-500 border-[12px] bg-gray-50',
      TWElement(
        'div',
        'flex items-start justify-start h-full',
        TWElement(
          'div',
          'flex flex-col justify-between w-full h-full',
          [
            TWElement('h1', 'text-[80px] p-20 font-black text-left', props.title),
            TWElement('div', 'text-2xl pb-10 px-20 font-bold mb-0', props.website),
          ],
        ),
      ),
    )
  },
})
