import React from 'react';
import { mount } from 'enzyme';
import Carousel from '../../src';

describe('<Carousel />', () => {
  describe('Rendering and Mounting', () => {
    it('should correctly mount with children.', () => {
      const wrapper = mount(
        <Carousel>
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
      const children = wrapper.find('p');
      expect(children).toHaveLength(3);
    });

    it('should render a div with the class `slider`.', () => {
      const wrapper = mount(
        <Carousel>
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
      const sliderDiv = wrapper.find('div.slider');
      expect(sliderDiv).toHaveLength(1);
    });

    it('should render a div with the class `slider-frame`.', () => {
      const wrapper = mount(
        <Carousel>
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
      const sliderFrameDiv = wrapper.find('div.slider-frame');
      expect(sliderFrameDiv).toHaveLength(1);
    });

    it('should render an ul with the class `slider-list`.', () => {
      const wrapper = mount(
        <Carousel>
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
      const sliderListUl = wrapper.find('ul.slider-list');
      expect(sliderListUl).toHaveLength(1);
    });

    it('should render children with the `slider-slide` class.', () => {
      const wrapper = mount(
        <Carousel>
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
      const children = wrapper.find('.slider-slide');
      expect(children).toHaveLength(3);
    });

    it('should render decorators by default.', () => {
      const wrapper = mount(
        <Carousel>
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
      const decorator1 = wrapper.find('.slider-decorator-0');
      const decorator2 = wrapper.find('.slider-decorator-0');
      const decorator3 = wrapper.find('.slider-decorator-0');
      expect(decorator1).toHaveLength(1);
      expect(decorator2).toHaveLength(1);
      expect(decorator3).toHaveLength(1);
    });
  });

  describe('Props', () => {
    it('should render with the class `slider` when no props are supplied.', () => {
      const wrapper = mount(
        <Carousel>
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
      const slider = wrapper.find('div.slider');
      expect(slider).toHaveLength(1);
    });

    it('should render with the class `test` with className supplied.', () => {
      const wrapper = mount(
        <Carousel className="test">
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
      const slider = wrapper.find('div.test');
      expect(slider).toHaveLength(1);
    });

    it('should merge provided styles with default styles.', () => {
      const wrapper = mount(
        <Carousel style={{ backgroundColor: 'black' }}>
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
      const slider = wrapper.find('div.slider');
      expect(slider.props().style).toEqual(
        expect.objectContaining({ backgroundColor: 'black', display: 'block' })
      );
    });

    it('should align to 0 when `cellAlign` is `left`.', () => {
      const wrapper = mount(
        <Carousel cellAlign="left">
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
      const slider = wrapper.find('.slider-list');
      expect(slider.props().style).toEqual(
        expect.objectContaining({ transform: 'translate3d(0px, 0px, 0)' })
      );
    });

    it('should set slidesToScroll to 2 if slideWidth is 250px and slidesToScroll is auto',
      () => {
        const component = mount(
          React.createElement(Carousel, {slideWidth: '250px', width: '600px', slidesToScroll: 'auto'},
            React.createElement('p', {className: 'test-slide'}, 'Slide 1'),
            React.createElement('p', null, 'Slide 2'),
            React.createElement('p', null, 'Slide 3')
          )
        );

        expect(component.state.slidesToScroll).to.equal(2);
      });

    it('should set slidesToScroll to 3 with slideWidth: 100px, cellSpacing: 100, slidesToScroll:auto',
      () => {
        const component = mount(
          React.createElement(Carousel, {
            slideWidth: '100px',
            width: '600px',
            cellSpacing: 100,
            slidesToScroll: 'auto'
          },
            React.createElement('p', {className: 'test-slide'}, 'Slide 1'),
            React.createElement('p', null, 'Slide 2'),
            React.createElement('p', null, 'Slide 3')
          )
        );

        expect(component.state.slidesToScroll).to.equal(3);
      });

    it('should set slidesToScroll to 6 if slideWidth is 100px and slidesToScroll is auto',
      () => {
        const component = mount(
          <Carousel slideWidth={'100px'} width={'600px'} slidesToScroll={'auto'}>
            <p className='test-slide'>Slide 1</p>,
            <p>Slide 2</p>
            <p>Slide 3</p>
          </Carousel>
        );

        expect(component.state.slidesToScroll).to.equal(6);
      });

    it('should set prop heightMode is "first" by default',
        () => {
          const component = mount(
              <Carousel>
                <p className="test-slide">Slide 1</p>
                </Carousel>
              );

          expect(component.props.heightMode).to.equal('first');
        });

    it('should shouldRecalculateHeight is false by default',
        () => {
          const component = mount(
              <Carousel>
                <p className='test-slide'>Slide 1</p>
              </Carousel>
          );

          expect(component.props.shouldRecalculateHeight).to.equal(false);
        });
  });

  describe('methods', () => {
    it('should advance if nextSlide() is called.', () => {
      const wrapper = mount(
        <Carousel cellAlign="left">
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
      expect(wrapper.state().currentSlide).toEqual(0);
      wrapper.instance().nextSlide();
      expect(wrapper.state().currentSlide).toEqual(1);
    });

    it('should not advance past the last slide.', () => {
      const wrapper = mount(
        <Carousel cellAlign="left">
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
      wrapper.instance().nextSlide();
      wrapper.instance().nextSlide();
      expect(wrapper.state().currentSlide).toEqual(2);
      wrapper.instance().nextSlide();
      expect(wrapper.state().currentSlide).toEqual(2);
    });

    it('should not go back to the previous slide when index is 0.', () => {
      const wrapper = mount(
        <Carousel cellAlign="left">
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
      expect(wrapper.state().currentSlide).toEqual(0);
      wrapper.instance().previousSlide();
      expect(wrapper.state().currentSlide).toEqual(0);
    });

    it('should go back to the previous slide when `previousSlide` is called.', () => {
      const wrapper = mount(
        <Carousel cellAlign="left">
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
      expect(wrapper.state().currentSlide).toEqual(0);
      wrapper.instance().nextSlide();
      wrapper.instance().nextSlide();
      wrapper.instance().previousSlide();
      expect(wrapper.state().currentSlide).toEqual(1);
    });

    it('should go to correct slide when `goToSlide` is called.', () => {
      const wrapper = mount(
        <Carousel cellAlign="left">
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      );
      expect(wrapper.state().currentSlide).toEqual(0);
      wrapper.instance().goToSlide(2);
      expect(wrapper.state().currentSlide).toEqual(2);
    });

    it('should correct find slide with max height', () => {
      const component = mount(
          <Carousel heightMode='max'>
              <div style={{height: '200px'}}>'Slide 1</div>,
              <div style={{height: '300px'}}>'Slide 2</div>,
              <div style={{height: '400px'}}>'Slide 3</div>,
              <div style={{height: '300px'}}>'Slide 4</div>,
              <div style={{height: '200px'}}>'Slide 5</div>,
          </Carousel>
      );

      expect(component.state.slideHeight).to.equal(400);
    });

    it('should correct recalculate height when child is update', () => {
      const component = mount(
          <Carousel heightMode='max' shouldRecalculateHeight>
              <div style={{height: '200px'}}>'Slide 1</div>
              <div style={{height: '300px'}}>'Slide 2</div>
              <div style={{height: '400px'}}>'Slide 3</div>
              <div style={{height: '300px'}}>'Slide 4</div>
              <div style={{height: '200px'}}>'Slide 5</div>
          </Carousel>
      );

      const frame = component.refs.frame;
      const thirdSlide = frame.childNodes[0].childNodes[2];
      thirdSlide.style.height = '600px';
      component.forceUpdate();

      expect(component.state.slideHeight).to.equal(600);
    });

  });
});
