/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/sort-comp */
/* eslint-disable require-jsdoc */
/* eslint-disable sort-keys */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/no-unused-prop-types */
import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import GetAppIcon from '@material-ui/icons/GetApp';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';
import PropTypes, { bool } from 'prop-types';
import { TextareaAutosize, withStyles } from '@material-ui/core';
import { v4 as uuid } from 'uuid';
import WebAnnotation from './WebAnnotation';
import AnnotationActionsContext from './AnnotationActionsContext';

/** */
const styles = (theme) => ({
  listitem: {
    '&:focus': {
      backgroundColor: theme.palette.action.focus,
    },
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  timecodeInput: {
    margin: theme.spacing(1),
  },
  commentInput: {
    margin: theme.spacing(1),
  },
  videoContainer: {
    position: 'relative',
    width: '100%', // Full width of the dialog
  },
  video: {
    width: '100%', // Video takes full width
    height: 'auto', // Height adjusts automatically
  },
  overlay: {
    position: 'absolute',
    border: '2px solid red',
    display: 'none', // Initially hidden
  },
  textarea: {
    width: '100%', // Full width of the container
    margin: theme.spacing(1, 0), // Margin at top and bottom
    padding: theme.spacing(1), // Padding inside the textarea
    borderColor: theme.palette.grey[300], // Border color
    borderRadius: theme.shape.borderRadius, // Border radius
    minHeight: '100px', // Minimum height
  },
});

/** */
class AnnotationVideoDialog extends Component {
  /** */
  constructor(props) {
    super(props);
    this.state = {
      exportLinks: [],
      timecode: '00:00',
      duration: '1', // Add this line for duration
      comment: '',
      showRectangle: false,
      rect: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      }, // Initial rectangle dimensions
      dragging: false,
      videoMetadata: { width: 0, height: 0 },
    };
    this.closeDialog = this.closeDialog.bind(this);
    this.handleTimecodeChange = this.handleTimecodeChange.bind(this);
    this.handleDurationChange = this.handleDurationChange.bind(this);
    this.loadVideoAtTimecode = this.loadVideoAtTimecode.bind(this);
    this.videoRef = React.createRef();
    this.overlayRef = React.createRef();
    console.log(props.videoUrl);
  }

  /** */
  componentDidUpdate(prevProps) {}

  handleVideoLoaded = () => {
    const video = this.videoRef.current;
    console.log('vid', { width: video.videoWidth, height: video.videoHeight });
    this.setState({
      videoMetadata: { width: video.videoWidth, height: video.videoHeight },
    });
  };

  handleTimecodeChange(event) {
    this.setState({ timecode: event.target.value });
  }

  handleDurationChange(event) {
    this.setState({ duration: event.target.value }); // New handler for duration change
  }

  onMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const overlayRect = this.overlayRef.current.getBoundingClientRect();
    this.setState({
      dragging: true,
      rect: {
        ...this.state.rect,
        x: e.clientX - overlayRect.left,
        y: e.clientY - overlayRect.top,
      },
    });
  };

  onMouseMove = (e) => {
    if (!this.state.dragging) return;
    e.preventDefault();
    e.stopPropagation();

    const overlayRect = this.overlayRef.current.getBoundingClientRect();
    this.setState({
      rect: {
        ...this.state.rect,
        width: Math.max(0, e.clientX - overlayRect.left - this.state.rect.x),
        height: Math.max(0, e.clientY - overlayRect.top - this.state.rect.y),
      },
    });
  };

  onMouseUp = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ dragging: false });
  };

  loadVideoAtTimecode = () => {
    const seconds = this.parseTimecode();
    this.videoRef.current.currentTime = seconds;
  };

  drawRectangle = () => {
    this.setState({ showRectangle: true });
  };

  parseTimecode() {
    const { timecode } = this.state;
    const timeParts = timecode.split(':');
    const seconds = parseInt(timeParts[0], 10) * 60 + parseInt(timeParts[1], 10);
    return seconds;
  }

  handleSave = () => {
    const {
      videoMetadata, rect, comment, duration, timecode,
    } = this.state;
    const { canvases, config, receiveAnnotation } = this.props;

    // Calculate scale ratios
    const overlayRect = this.overlayRef.current.getBoundingClientRect();
    const scaleX = videoMetadata.width / overlayRect.width;
    const scaleY = videoMetadata.height / overlayRect.height;

    // Scale rectangle dimensions and position
    const scaledRect = {
      x: rect.x * scaleX,
      y: rect.y * scaleY,
      width: rect.width * scaleX,
      height: rect.height * scaleY,
    };

    canvases.forEach((canvas) => {
      const storageAdapter = config.annotation.adapter(canvas.id);
      const secondStart = this.parseTimecode();
      const secondEnd = parseInt(secondStart, 10) + parseInt(duration, 10);
      const videoAnnotation = {
        body: { type: 'TextualBody', value: comment },
        id: uuid(),
        motivation: 'commenting',
        target:
          `${canvas.id}#xywh=${scaledRect.x},${scaledRect.y},${scaledRect.width},${scaledRect.height}`
          + `&t=${secondStart},${secondEnd}`,
        type: 'Annotation',
      };

      storageAdapter.create(videoAnnotation).then((annoPage) => {
        receiveAnnotation(canvas.id, storageAdapter.annotationPageId, annoPage);
        this.closeDialog();
      });
    });
  };

  handleCommentChange = (event) => {
    this.setState({ comment: event.target.value });
  };

  /** */
  closeDialog() {
    const { handleClose } = this.props;
    // this.setState({ exportLinks: [] });
    handleClose();
  }

  /** */
  render() {
    const {
      classes, handleClose, open, videoUrl,
    } = this.props;
    const {
      timecode, showRectangle, rect, comment, duration,
    } = this.state;

    return (
      <Dialog
        aria-labelledby="annotation-video-dialog-title"
        id="annotation-video-dialog"
        onClose={handleClose}
        onEscapeKeyDown={this.closeDialog}
        open={open}
      >
        <DialogTitle id="annotation-video-dialog-title" disableTypography>
          <Typography variant="h2">Add Video Annotation</Typography>
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Timecode (MM:SS)"
            value={timecode}
            onChange={this.handleTimecodeChange}
            className={classes.timecodeInput}
          />
          <TextField
            label="Duration (s)"
            value={duration}
            onChange={this.handleDurationChange}
            className={classes.timecodeInput}
          />
          <Button onClick={this.loadVideoAtTimecode}>Load at timecode</Button>
          <Button onClick={this.drawRectangle}>Draw Rectangle</Button>
          <div
            className={classes.videoContainer}
            onMouseDown={this.onMouseDown}
            onMouseMove={this.onMouseMove}
            onMouseUp={this.onMouseUp}
            ref={this.overlayRef}
          >
            <video
              className={classes.video}
              ref={this.videoRef}
              onLoadedMetadata={this.handleVideoLoaded}
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {showRectangle && (
              <div
                className={classes.overlay}
                style={{
                  display: 'block',
                  left: rect.x,
                  top: rect.y,
                  width: rect.width,
                  height: rect.height,
                }}
              />
            )}
          </div>
          <textarea
            value={comment}
            onChange={this.handleCommentChange}
            placeholder="Enter your comment here"
            className={classes.textarea}
          />
          <Button
            onClick={this.handleSave}
            color="primary"
            className={classes.saveButton}
          >
            Save
          </Button>
          <Button onClick={this.closeDialog} color="primary">
            Close
          </Button>
        </DialogContent>
      </Dialog>
    );
  }
}

AnnotationVideoDialog.contextType = AnnotationActionsContext;

AnnotationVideoDialog.propTypes = {
  canvases: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string }))
    .isRequired,
  classes: PropTypes.objectOf(PropTypes.string),
  config: PropTypes.shape({
    annotation: PropTypes.shape({
      adapter: PropTypes.func,
    }),
  }).isRequired,
  handleClose: PropTypes.func.isRequired,
  open: bool.isRequired,
  receiveAnnotation: PropTypes.func.isRequired,
  videoUrl: PropTypes.string.isRequired,
};

AnnotationVideoDialog.defaultProps = {
  classes: {},
};

export default withStyles(styles)(AnnotationVideoDialog);
