import { Product } from "@medusajs/medusa"
import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import Button from "../../../../../components/fundamentals/button"
import Modal from "../../../../../components/molecules/modal"
import { nestedForm } from "../../../../../utils/nested-form"
import ThumbnailForm, {
  ThumbnailFormType,
} from "../../../components/thumbnail-form"
import useEditProductActions from "../../hooks/use-edit-product-actions"

type Props = {
  product: Product
  open: boolean
  onClose: () => void
}

type ThumbnailFormWrapper = {
  thumbnail: ThumbnailFormType
}

const ThumbnailModal = ({ product, open, onClose }: Props) => {
  const { onUpdate, updating } = useEditProductActions(product.id)
  const form = useForm<ThumbnailFormWrapper>({
    defaultValues: getDefaultValues(product),
  })

  const {
    formState: { isDirty },
    handleSubmit,
    reset,
  } = form

  useEffect(() => {
    reset(getDefaultValues(product))
  }, [product, reset])

  const onReset = () => {
    reset(getDefaultValues(product))
    onClose()
  }

  const onSubmit = handleSubmit(async (data) => {
    const { thumbnail } = data.thumbnail

    onUpdate({ thumbnail }, onReset)
  })

  return (
    <Modal open={open} handleClose={onReset} isLargeModal>
      <Modal.Body>
        <Modal.Header handleClose={onReset}>
          <h1 className="inter-xlarge-semibold m-0">Upload Thumbnail</h1>
        </Modal.Header>
        <form onSubmit={onSubmit}>
          <Modal.Content>
            <h2 className="inter-large-semibold mb-2xsmall">Thumbnail</h2>
            <p className="inter-base-regular text-grey-50 mb-large">
              Used to represent your product during checkout, social sharing and
              more.
            </p>
            <ThumbnailForm form={nestedForm(form, "thumbnail")} />
          </Modal.Content>
          <Modal.Footer>
            <div className="flex gap-x-2 justify-end w-full">
              <Button
                size="small"
                variant="secondary"
                type="button"
                onClick={onReset}
              >
                Cancel
              </Button>
              <Button
                size="small"
                variant="primary"
                type="submit"
                disabled={!isDirty}
                loading={updating}
              >
                Save and close
              </Button>
            </div>
          </Modal.Footer>
        </form>
      </Modal.Body>
    </Modal>
  )
}

const getDefaultValues = (product: Product): ThumbnailFormWrapper => {
  return {
    thumbnail: { thumbnail: product.thumbnail || "" },
  }
}

export default ThumbnailModal
