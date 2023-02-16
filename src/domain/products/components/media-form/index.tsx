import { useState } from "react"
import { useFieldArray } from "react-hook-form"
import Button from "../../../../components/fundamentals/button"
import TrashIcon from "../../../../components/fundamentals/icons/trash-icon"
import Actionables, {
  ActionType,
} from "../../../../components/molecules/actionables"
import InputField from "../../../../components/molecules/input"
import { NestedForm } from "../../../../utils/nested-form"

export type MediaFormType = {
  images: { url: string }[]
}

type Props = {
  form: NestedForm<MediaFormType>
}

const MediaForm = ({ form }: Props) => {
  const [currentImage, setCurrentImage] = useState<string>("")
  const {
    control,
    path,
    formState: { errors },
  } = form

  const { fields, remove, append } = useFieldArray({
    control: control,
    name: path("images"),
  })

  const handleAdd = () => {
    append({ url: currentImage })
    setCurrentImage("")
  }

  const actions = (id: string): ActionType[] => {
    const index = fields.findIndex((field) => field.id === id)

    return [
      {
        label: "Delete",
        onClick: () => remove(index),
        icon: <TrashIcon size={20} />,
        variant: "danger",
      },
    ]
  }

  return (
    <div>
      <div>
        <div>
          <InputField
            label="Media url"
            errors={errors}
            onChange={(e) => setCurrentImage(e.currentTarget.value)}
            value={currentImage}
          />
          <Button onClick={handleAdd} variant="primary" type="button">
            +
          </Button>
        </div>
      </div>
      {fields.length > 0 && (
        <div className="mt-large">
          <div className="mb-small flex items-center justify-between">
            <h2 className="inter-large-semibold">Uploads</h2>
          </div>
          <div className="flex flex-col gap-y-2xsmall">
            {fields
              .filter((field) => field.url)
              .map((field) => {
                return (
                  <div className="relative flex" key={field.id}>
                    <p className="w-4/5 break-all">{field.url}</p>
                    <div className="absolute top-0 right-base bottom-0 flex items-center">
                      <Actionables actions={actions(field.id)} forceDropdown />
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      )}
    </div>
  )
}

export default MediaForm
