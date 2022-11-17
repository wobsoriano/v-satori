import { defineComponent } from 'vue'

declare module 'vue' {
  interface HTMLAttributes {
    tw?: string
  }
}

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
    return () => (
      <div tw="h-full w-full flex items-start justify-start border border-blue-500 border-[12px] bg-gray-50">
        <div tw="flex items-start justify-start h-full">
          <div tw="flex flex-col justify-between w-full h-full'">
            <h1 tw="text-[80px] p-20 font-black text-left">{props.title}</h1>
            <div tw="text-2xl pb-10 px-20 font-bold mb-0">{props.website}</div>
          </div>
        </div>
      </div>
    )
  },
})
