import InputField from "../../../../components/molecules/input"
import { NestedForm } from "../../../../utils/nested-form"

export type ThumbnailFormType = {
  thumbnail: string
}

type Props = {
  form: NestedForm<ThumbnailFormType>
}

const ThumbnailForm = ({ form }: Props) => {
  const {
    path,
    register,
    formState: { errors },
  } = form

  return (
    <div>
      <div>
        <div className="mt-large">
          <InputField
            label="Thumbnail url"
            required
            {...register(path("thumbnail"))}
            errors={errors}
          />
        </div>
      </div>
    </div>
  )
}

export default ThumbnailForm
